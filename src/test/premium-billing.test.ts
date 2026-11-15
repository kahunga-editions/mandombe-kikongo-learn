import { describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: vi.fn() } } }));
import { premiumBillingAction } from "@/lib/premiumBilling";

describe("Premium billing destination", () => {
  it("opens checkout for an admin with access but no paid subscription", () => {
    expect(premiumBillingAction(true, null)).toBe("create-checkout");
  });
  it("opens the portal for a paid subscriber", () => {
    expect(premiumBillingAction(true, "2026-12-15T00:00:00Z")).toBe("customer-portal");
  });
  it("opens checkout for a non-premium learner", () => {
    expect(premiumBillingAction(false, null)).toBe("create-checkout");
  });
});