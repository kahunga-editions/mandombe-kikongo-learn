export function retiredMonthlyCheckout() {
  return {
    status: 410,
    body: {
      error: "Les abonnements mensuels ne sont plus proposés. Premium est disponible uniquement par paiement PayPal unique de 37 EUR pour un accès à vie.",
      product: "full_premium",
      amount_cents: 3700,
      currency: "EUR",
      recurring: false,
      premium_path: "/#premium",
    },
  };
}