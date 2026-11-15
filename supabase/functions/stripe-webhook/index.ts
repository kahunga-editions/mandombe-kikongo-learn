import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { premiumState } from "../_shared/premium-state.ts";

const events = new Set([
  "checkout.session.completed", "checkout.session.async_payment_succeeded",
  "customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted",
  "invoice.paid", "invoice.payment_succeeded", "invoice.payment_failed",
]);
const reply = (status: number, body: object) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });
  const signature = req.headers.get("stripe-signature");
  if (!signature) return reply(400, { error: "Missing Stripe signature" });
  const key = Deno.env.get("STRIPE_SECRET_KEY");
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!key || !secret) return reply(503, { error: "Stripe webhook not configured" });
  const stripe = new Stripe(key, { apiVersion: "2025-08-27.basil" });
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(await req.text(), signature, secret, undefined, Stripe.createSubtleCryptoProvider());
  } catch {
    return reply(400, { error: "Invalid Stripe signature" });
  }
  if (!events.has(event.type)) return reply(200, { received: true, ignored: true });
  try {
    const object = event.data.object as { customer?: string | { id: string }; mode?: string };
    if (event.type.startsWith("checkout.") && object.mode !== "subscription") return reply(200, { received: true, ignored: true });
    const customerId = typeof object.customer === "string" ? object.customer : object.customer?.id;
    if (!customerId) return reply(400, { error: "Missing customer" });
    // Re-fetch current state: delayed events must not reinstate an ended subscription.
    const [customer, list] = await Promise.all([
      stripe.customers.retrieve(customerId),
      stripe.subscriptions.list({ customer: customerId, status: "all", limit: 100, expand: ["data.latest_invoice"] }),
    ]);
    if (customer.deleted) return reply(200, { received: true, ignored: true });
    const candidates = list.data.map((sub) => premiumState(sub));
    const state = candidates.find((sub) => sub.isPremium) ?? candidates[0];
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
    const metadataUserId = customer.metadata?.user_id;
    const userId = metadataUserId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(metadataUserId) ? metadataUserId : null;
    const { error } = await db.rpc("sync_stripe_premium_event", {
      p_event_id: event.id, p_event_created: event.created, p_customer_id: customerId,
      p_user_id: userId, p_email: customer.email,
      p_subscription_id: state?.subscriptionId ?? null, p_status: state?.status ?? "inactive",
      p_is_premium: state?.isPremium ?? false, p_period_start: state?.periodStart ?? null,
      p_period_end: state?.periodEnd ?? null,
    });
    if (error) throw new Error("Subscription synchronization failed");
    console.info("Stripe event processed", { eventId: event.id, type: event.type });
    return reply(200, { received: true });
  } catch {
    console.error("Stripe webhook synchronization failed", { eventId: event.id });
    return reply(500, { error: "Subscription synchronization failed; retry required" });
  }
});