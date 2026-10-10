import { parseStoredCart, type CartItem } from "./cart";

const STORAGE_KEY = "thrive.cart.v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (items === null) {
    try {
      items = parseStoredCart(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      items = [];
    }
  }
  return items;
}

function emit() {
  for (const listener of listeners) listener();
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        items = parseStoredCart(event.newValue);
        emit();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartItem[] {
    return read();
  },
  getServerSnapshot(): CartItem[] {
    return EMPTY;
  },
  set(next: CartItem[]) {
    items = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be unavailable (private mode, quota); the cart still works for this visit.
    }
    emit();
  },
};
