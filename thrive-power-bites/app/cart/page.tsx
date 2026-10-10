import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <h1 className="heading-lg">Your cart</h1>
      <CartView />
    </div>
  );
}
