import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.25.76";
import {
  FULL_PREMIUM_PRODUCT,
  HttpError,
  PREMIUM_AMOUNT_EUR,
  PREMIUM_CURRENCY,
  getServiceClient,
  paypalErrorResponse,
  paypalRequest,
  requireUser,
} from "../_shared/paypal.ts";

const BodySchema = z.object({
  orderId: z.string().min(3).max(64).regex(/^[A-Z0-9-]+$/i),
});

function assertOrderOwnership(order: any, userId: string) {
  if (!Array.isArray(order.purchase_units) || order.purchase_units.length !== 1) {
    throw new HttpError("Invalid PayPal order", 400);
  }
  const unit = order.purchase_units[0];
  if (unit.custom_id !== userId) {
    throw new HttpError("This PayPal order does not belong to the signed-in user", 403);
  }
  if (unit.amount?.currency_code !== PREMIUM_CURRENCY || unit.amount?.value !== PREMIUM_AMOUNT_EUR) {
    throw new HttpError("Unexpected Premium price", 400);
  }
  return unit;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { orderId } = parsed.data;
    const supabase = getServiceClient();
    const user = await requireUser(req, supabase);

    const { data: existing, error: existingError } = await supabase
      .from("lifetime_unlocks")
      .select("user_id")
      .eq("user_id", user.id)
      .eq("product", FULL_PREMIUM_PRODUCT)
      .maybeSingle();
    if (existingError) throw existingError;
    if (existing) {
      return new Response(JSON.stringify({ verified: true, product: FULL_PREMIUM_PRODUCT }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let order = await paypalRequest(`/v2/checkout/orders/${orderId}`);
    let unit = assertOrderOwnership(order, user.id);

    if (order.status !== "COMPLETED") {
      if (order.status !== "APPROVED") {
        return new Response(JSON.stringify({ verified: false, status: order.status }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      order = await paypalRequest(`/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: { "PayPal-Request-Id": `capture-${orderId}` },
        body: JSON.stringify({}),
      });
      unit = assertOrderOwnership(order, user.id);
    }

    const captures = unit.payments?.captures;
    const capture = Array.isArray(captures)
      ? captures.find((row: any) => row.status === "COMPLETED")
      : null;
    if (order.status !== "COMPLETED" || !capture) {
      return new Response(JSON.stringify({ verified: false, status: order.status }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (capture.amount?.currency_code !== PREMIUM_CURRENCY || capture.amount?.value !== PREMIUM_AMOUNT_EUR) {
      throw new HttpError("Unexpected captured amount", 400);
    }

    const { error: unlockError } = await supabase.from("lifetime_unlocks").upsert({
      user_id: user.id,
      product: FULL_PREMIUM_PRODUCT,
      paypal_order_id: orderId,
      paypal_capture_id: capture.id,
      amount_cents: 3700,
      currency: PREMIUM_CURRENCY,
      purchased_at: new Date().toISOString(),
    }, { onConflict: "user_id,product" });
    if (unlockError) throw unlockError;

    return new Response(JSON.stringify({ verified: true, product: FULL_PREMIUM_PRODUCT }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return paypalErrorResponse(error, corsHeaders);
  }
});
