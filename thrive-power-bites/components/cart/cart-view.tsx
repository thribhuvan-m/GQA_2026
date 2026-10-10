"use client";

import Link from "next/link";
import { ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
import { CartLines } from "./cart-lines";
import { CartSummary } from "./cart-summary";

export function CartView() {
  const { lines, hydrated, clear } = useCart();

  if (!hydrated) {
    return (
      <p className="mt-10 flex items-center gap-2 text-forest/60" role="status">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading your cart…
      </p>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="card mt-10 flex flex-col items-center gap-4 px-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-beige/60">
          <ShoppingBag className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="text-forest/65">Add a pack of POWER BITES to get started.</p>
        <Link href="/shop" className="btn-primary mt-2">Explore Power Bites</Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="card px-6">
        <CartLines />
        <div className="flex justify-between border-t border-forest/8 py-4">
          <Link href="/shop" className="text-sm font-bold text-leaf hover:text-forest">Continue shopping</Link>
          <button type="button" onClick={clear} className="text-sm font-semibold text-forest/55 hover:text-rust">
            Clear cart
          </button>
        </div>
      </div>
      <aside className="card h-fit space-y-5 p-6" aria-labelledby="summary-title">
        <h2 id="summary-title" className="heading-md">Order summary</h2>
        <CartSummary />
        <Link href="/checkout" className="btn-primary w-full">
          Continue to checkout <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
