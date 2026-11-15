import { beforeEach, describe, expect, it, vi } from "vitest";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke } } }));

import {
  PAYPAL_PREMIUM_PRICE_EUR,
  PAYPAL_PREMIUM_PRODUCT,
  capturePayPalPremiumOrder,
  createPayPalPremiumOrder,
} from "@/lib/premiumBilling";

describe("PayPal lifetime Premium", () => {
  beforeEach(() => invoke.mockReset());

  it("sets the one-time full-site price to exactly 37 EUR", () => {
    expect(PAYPAL_PREMIUM_PRICE_EUR).toBe(37);
  });

  it("uses the lifetime full-site unlock rather than a subscription", () => {
    expect(PAYPAL_PREMIUM_PRODUCT).toBe("full_premium");
  });

  it("creates a PayPal order without accepting a browser-supplied price", async () => {
    invoke.mockResolvedValue({ data: { orderId: "ORDER-123" }, error: null });
    await expect(createPayPalPremiumOrder()).resolves.toBe("ORDER-123");
    expect(invoke).toHaveBeenCalledWith("create-paypal-premium-order", { body: {} });
  });

  it("captures only the approved order before unlocking Premium", async () => {
    invoke.mockResolvedValue({ data: { verified: true, product: "full_premium" }, error: null });
    await expect(capturePayPalPremiumOrder("ORDER-123")).resolves.toEqual({
      verified: true,
      product: "full_premium",
    });
    expect(invoke).toHaveBeenCalledWith("capture-paypal-premium-order", {
      body: { orderId: "ORDER-123" },
    });
  });
});
