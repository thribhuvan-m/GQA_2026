"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { PackMockup } from "@/components/brand/pack-mockup";
import { formatINR } from "@/lib/format";

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQuantity, remove } = useCart();
  return (
    <ul className="divide-y divide-forest/8">
      {lines.map((line) => (
        <li key={line.productId} className="flex gap-4 py-5">
          <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-2xl bg-beige/50">
            <PackMockup id={`cart-${line.productId}`} className="h-20 w-auto" title={`${line.product.name} pack`} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link href="/shop" onClick={onNavigate} className="font-bold hover:underline">
                  {line.product.name}
                </Link>
                <p className="text-sm text-forest/60">
                  {line.product.flavour} · {line.product.packSizeGrams} g ({line.product.bitesPerPack} × {line.product.biteWeightGrams} g)
                </p>
              </div>
              <p className="shrink-0 font-bold tabular-nums">{formatINR(line.lineTotal)}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <QuantitySelector
                size="sm"
                label={`Quantity of ${line.product.name} in cart`}
                value={line.quantity}
                min={1}
                max={line.product.maxQuantityPerOrder}
                onChange={(v) => setQuantity(line.productId, v)}
              />
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-forest/60 transition hover:bg-rust/10 hover:text-rust"
                onClick={() => remove(line.productId)}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Remove<span className="sr-only"> {line.product.name}</span>
              </button>
            </div>
            <p className="text-xs text-forest/50">{formatINR(line.product.price.sellingPrice)} each</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
