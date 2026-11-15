import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import {
  FULL_PREMIUM_PRODUCT,
  PREMIUM_AMOUNT_EUR,
  PREMIUM_CURRENCY,
  getServiceClient,
  paypalErrorResponse,
  paypalRequest,
  requireUser,
} from "../_shared/paypal.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
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
      return new Response(JSON.stringify({ error: "Premium is already active" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = await paypalRequest("/v2/checkout/orders", {
      method: "POST",
      headers: { "PayPal-Request-Id": crypto.randomUUID() },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          custom_id: user.id,
          description: "Nzo mikanda - Premium a vie",
          amount: { currency_code: PREMIUM_CURRENCY, value: PREMIUM_AMOUNT_EUR },
        }],
        application_context: {
          brand_name: "Nzo mikanda",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
        },
      }),
    });

    if (!order.id || typeof order.id !== "string") {
      throw new Error("PayPal did not return an order ID");
    }
    return new Response(JSON.stringify({ orderId: order.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return paypalErrorResponse(error, corsHeaders);
  }
});
