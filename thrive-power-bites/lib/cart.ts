import { getProduct, type Product } from "@/config/product";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartLine = CartItem & {
  product: Product;
  lineTotal: number;
};

export function clampQuantity(quantity: number, max: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(Math.round(quantity), 1), max);
}

export function addItem(items: CartItem[], productId: string, quantity: number): CartItem[] {
  const product = getProduct(productId);
  if (!product) return items;
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    return items.map((i) =>
      i.productId === productId
        ? { ...i, quantity: clampQuantity(i.quantity + quantity, product.maxQuantityPerOrder) }
        : i,
    );
  }
  return [...items, { productId, quantity: clampQuantity(quantity, product.maxQuantityPerOrder) }];
}

export function setItemQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  const product = getProduct(productId);
  if (!product) return items;
  if (quantity <= 0) return removeItem(items, productId);
  return items.map((i) =>
    i.productId === productId ? { ...i, quantity: clampQuantity(quantity, product.maxQuantityPerOrder) } : i,
  );
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

/** Prices always come from the product config, never from stored cart data. */
export function toLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = getProduct(item.productId);
    if (!product) return [];
    return [{ ...item, product, lineTotal: product.price.sellingPrice * item.quantity }];
  });
}

export function subtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}

export function itemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.flatMap((entry) => {
      if (typeof entry !== "object" || entry === null) return [];
      const { productId, quantity } = entry as Record<string, unknown>;
      if (typeof productId !== "string" || typeof quantity !== "number") return [];
      const product = getProduct(productId);
      if (!product) return [];
      return [{ productId, quantity: clampQuantity(quantity, product.maxQuantityPerOrder) }];
    });
  } catch {
    return [];
  }
}
