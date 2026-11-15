import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Premium access granted by a role is not a paid Stripe subscription.
export const premiumBillingAction = (isPremium: boolean, subscriptionEnd: string | null) =>
  isPremium && subscriptionEnd ? "customer-portal" : "create-checkout";

export async function openPremiumBilling(action: "customer-portal" | "create-checkout") {
  const { data, error } = await supabase.functions.invoke(action);
  if (error) {
    const details = error instanceof FunctionsHttpError
      ? await error.context.text()
      : error.message;
    console.error(`${action} failed:`, details);
    throw new Error("Le paiement est indisponible pour le moment. Réessayez dans quelques instants.");
  }
  if (!data?.url || typeof data.url !== "string") {
    throw new Error("Le lien de paiement n'a pas pu être créé. Réessayez.");
  }
  // Async popup creation is blocked by some browsers; navigate the current tab.
  window.location.assign(data.url);
}