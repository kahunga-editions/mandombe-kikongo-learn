export const PREMIUM_PRICE_ID = "price_1T3oEkBd8z1DEMAaEs8zDLTQ";

export interface BillingSubscription {
  id: string;
  status: string;
  current_period_start?: number;
  current_period_end?: number;
  items: { data: Array<{ price: { id: string }; current_period_start?: number; current_period_end?: number }> };
  latest_invoice?: string | { status?: string; paid?: boolean } | null;
}

export function premiumState(sub: BillingSubscription, nowSeconds = Date.now() / 1000) {
  const item = sub.items.data.find((row) => row.price.id === PREMIUM_PRICE_ID);
  const start = item?.current_period_start ?? sub.current_period_start;
  const end = item?.current_period_end ?? sub.current_period_end;
  const invoice = typeof sub.latest_invoice === "object" ? sub.latest_invoice : null;
  const paid = invoice?.paid === true || invoice?.status === "paid";
  return {
    subscriptionId: sub.id,
    status: sub.status,
    isPremium: Boolean(item && sub.status === "active" && paid && end && end > nowSeconds),
    periodStart: start ? new Date(start * 1000).toISOString() : null,
    periodEnd: end ? new Date(end * 1000).toISOString() : null,
  };
}

export function storedPremiumIsActive(row: { is_premium: boolean; status: string; current_period_end: string | null }, now = Date.now()) {
  return row.is_premium && row.status === "active" && Boolean(row.current_period_end && Date.parse(row.current_period_end) > now);
}