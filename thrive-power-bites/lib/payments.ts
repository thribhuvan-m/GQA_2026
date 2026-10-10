import { checkout, type PaymentProviderId } from "@/config/checkout";
import type { CartLine } from "./cart";

export type CheckoutRequest = {
  lines: CartLine[];
  subtotal: number;
};

export type CheckoutResult =
  | { kind: "redirect"; url: string }
  | { kind: "unavailable"; reason: string };

/**
 * Integration point for a hosted payment provider (Razorpay, Shopify Checkout,
 * Cashfree…). Card/UPI details must only ever be entered on the provider's own
 * hosted page or SDK — never in custom forms on this site.
 */
export interface PaymentProvider {
  id: PaymentProviderId;
  startCheckout(request: CheckoutRequest): Promise<CheckoutResult>;
}

const unavailableProvider: PaymentProvider = {
  id: "none",
  async startCheckout() {
    return {
      kind: "unavailable",
      reason: "Online payments are not configured yet. No order has been placed and no payment has been taken.",
    };
  },
};

export function getPaymentProvider(): PaymentProvider {
  if (!checkout.liveOrdersEnabled || checkout.paymentProvider === "none") return unavailableProvider;
  // Register real providers here once accounts and policies are configured.
  return unavailableProvider;
}

export function isLiveCheckoutEnabled(): boolean {
  return checkout.liveOrdersEnabled && checkout.paymentProvider !== "none";
}
