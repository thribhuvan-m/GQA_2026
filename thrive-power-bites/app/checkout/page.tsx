import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout (demo)",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <h1 className="heading-lg">Checkout</h1>
      <CheckoutView />
    </div>
  );
}
