export type PaymentProviderId = "none" | "razorpay" | "shopify" | "cashfree";

export const checkout = {
  /**
   * Live checkout stays off until accounts, policies, FSSAI details and a
   * payment provider are configured. While false, checkout runs in demo mode:
   * no order is created and no payment is taken.
   */
  liveOrdersEnabled: false,
  paymentProvider: "none" as PaymentProviderId,
  currency: "INR",
  shippingFee: null as number | null,
  freeShippingThreshold: null as number | null,
} as const;
