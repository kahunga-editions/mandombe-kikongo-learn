import { describe, expect, it } from "vitest";
import { premiumState, storedPremiumIsActive, PREMIUM_PRICE_ID } from "../../supabase/functions/_shared/premium-state";

const now = 1800000000;
const sub = {
  id: "sub_test", status: "active", latest_invoice: { status: "paid", paid: true },
  items: { data: [{ price: { id: PREMIUM_PRICE_ID }, current_period_start: now - 100, current_period_end: now + 100 }] },
};
describe("Confirmed Premium payments", () => {
  it("activates Premium after confirmed payment", () => expect(premiumState(sub, now).isPremium).toBe(true));
  it("does not activate an unpaid subscription", () => expect(premiumState({ ...sub, latest_invoice: { status: "open", paid: false } }, now).isPremium).toBe(false));
  it("keeps paid access when cancellation is scheduled at period end", () => {
    const scheduled = { ...sub, cancel_at_period_end: true };
    expect(premiumState(scheduled, now).isPremium).toBe(true);
  });
  it("removes access when subscription ends", () => expect(premiumState({ ...sub, status: "canceled" }, now).isPremium).toBe(false));
  it("removes access at expiration even if a webhook is delayed", () => {
    expect(storedPremiumIsActive({ is_premium: true, status: "active", current_period_end: new Date(now * 1000).toISOString() }, now * 1000)).toBe(false);
  });
  it("does not grant access for another product", () => expect(premiumState({ ...sub, items: { data: [{ price: { id: "price_other" }, current_period_end: now + 100 }] } }, now).isPremium).toBe(false));
});