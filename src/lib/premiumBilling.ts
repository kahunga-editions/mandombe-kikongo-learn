import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const PAYPAL_PREMIUM_PRICE_EUR = 37;
export const PAYPAL_PREMIUM_PRODUCT = "full_premium";

async function invokeBilling<T>(action: string, body?: Record<string, string>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(action, { body });
  if (error) {
    const details = error instanceof FunctionsHttpError
      ? await error.context.text()
      : error.message;
    console.error(`${action} failed:`, details);
    throw new Error("Le paiement est indisponible pour le moment. Réessayez dans quelques instants.");
  }
  return data as T;
}

export async function createPayPalPremiumOrder() {
  const data = await invokeBilling<{ orderId?: string }>("create-paypal-premium-order", {});
  if (!data?.orderId) throw new Error("PayPal n'a pas pu créer la commande. Réessayez.");
  return data.orderId;
}

export async function capturePayPalPremiumOrder(orderId: string) {
  return invokeBilling<{ verified: boolean; status?: string; product?: string }>(
    "capture-paypal-premium-order",
    { orderId },
  );
}
