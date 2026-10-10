"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/config/product";
import { useCart } from "@/components/cart/cart-provider";
import { formatINR } from "@/lib/format";
import { QuantitySelector } from "./quantity-selector";

export function AddToCart({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add, open, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const inCart = items.find((i) => i.productId === product.id)?.quantity ?? 0;
  const remaining = Math.max(product.maxQuantityPerOrder - inCart, 0);
  const atLimit = remaining === 0;

  function handleAdd() {
    if (atLimit) return;
    add(product.id, Math.min(quantity, remaining));
    setAdded(true);
    setQuantity(1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
    if (!compact) open();
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {!compact ? (
          <QuantitySelector
            label={`Quantity of ${product.name}`}
            value={Math.min(quantity, Math.max(remaining, 1))}
            onChange={(v) => setQuantity(Math.min(Math.max(v, 1), Math.max(remaining, 1)))}
            max={Math.max(remaining, 1)}
          />
        ) : null}
        <button type="button" className="btn-primary flex-1 sm:flex-none" onClick={handleAdd} disabled={atLimit}>
          {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
          {added ? "Added to cart" : compact ? "Add to cart" : `Add to cart · ${formatINR(product.price.sellingPrice * quantity)}`}
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {added ? `${product.name} added to cart.` : ""}
      </p>
      {atLimit ? (
        <p className="text-sm text-rust">You have the maximum of {product.maxQuantityPerOrder} packs in your cart.</p>
      ) : null}
    </div>
  );
}
