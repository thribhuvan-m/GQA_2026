"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "./cart-provider";
import { CartLines } from "./cart-lines";
import { CartSummary } from "./cart-summary";

export function CartDrawer() {
  const { isOpen, close, lines, hydrated } = useCart();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
    if (!isOpen) document.documentElement.style.overflow = "";
  }, [isOpen]);

  const empty = !hydrated || lines.length === 0;

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-title"
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-cream p-0 text-forest shadow-lift open:animate-[slide-in_0.28s_ease-out]"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
          <h2 id="cart-title" className="text-lg font-extrabold">Your cart</h2>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-forest/5"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-beige/60">
              <ShoppingBag className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="text-lg font-bold">Your cart is empty</p>
            <p className="text-sm text-forest/65">Add a pack of POWER BITES to get started.</p>
            <Link href="/shop" onClick={close} className="btn-primary mt-2">
              Explore Power Bites
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <CartLines onNavigate={close} />
            </div>
            <div className="space-y-4 border-t border-forest/10 bg-white/50 px-6 py-5">
              <CartSummary />
              <div className="grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={close} className="btn-secondary">
                  View cart
                </Link>
                <Link href="/checkout" onClick={close} className="btn-primary">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
