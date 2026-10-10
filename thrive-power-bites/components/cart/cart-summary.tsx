"use client";

import { useCart } from "./cart-provider";
import { checkout } from "@/config/checkout";
import { formatINR } from "@/lib/format";

export function CartSummary() {
  const { subtotal, count } = useCart();
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-forest/70">
          Subtotal ({count} {count === 1 ? "pack" : "packs"})
        </dt>
        <dd className="font-bold tabular-nums">{formatINR(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-forest/70">Shipping</dt>
        <dd className="text-forest/60">
          {checkout.shippingFee === null ? "Calculated once shipping is configured" : formatINR(checkout.shippingFee)}
        </dd>
      </div>
      <p className="pt-1 text-xs text-forest/50">Prices are inclusive of all taxes. Prices shown are proposed and may change before launch.</p>
    </dl>
  );
}
