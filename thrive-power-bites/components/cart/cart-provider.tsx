"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import {
  addItem as addToItems,
  itemCount,
  removeItem as removeFromItems,
  setItemQuantity,
  subtotal as calcSubtotal,
  toLines,
  type CartItem,
  type CartLine,
} from "@/lib/cart";
import { cartStore } from "@/lib/cart-store";

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (productId: string, quantity: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const subscribeNoop = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((productId: string, quantity: number) => {
    cartStore.set(addToItems(cartStore.getSnapshot(), productId, quantity));
  }, []);
  const setQuantity = useCallback((productId: string, quantity: number) => {
    cartStore.set(setItemQuantity(cartStore.getSnapshot(), productId, quantity));
  }, []);
  const remove = useCallback((productId: string) => {
    cartStore.set(removeFromItems(cartStore.getSnapshot(), productId));
  }, []);
  const clear = useCallback(() => cartStore.set([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = toLines(items);
    return {
      items,
      lines,
      count: itemCount(items),
      subtotal: calcSubtotal(lines),
      hydrated,
      isOpen,
      open,
      close,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [items, hydrated, isOpen, open, close, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
