import useSWR, { mutate } from "swr";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

const CART_KEY = "cafe-aroma-cart";

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = sessionStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CART_KEY, JSON.stringify(items));
  mutate("cart", items, false);
}

export function useCart() {
  const { data: items = [] } = useSWR<CartItem[]>("cart", getCart, {
    fallbackData: [],
  });

  const totalItems = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );
  const totalPrice = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  function addItem(item: Omit<CartItem, "quantity">) {
    const current = getCart();
    const existingIndex = current.findIndex(
      (i) => i.productId === item.productId && i.size === item.size
    );

    if (existingIndex >= 0) {
      current[existingIndex].quantity += 1;
    } else {
      current.push({ ...item, quantity: 1 });
    }
    saveCart(current);
  }

  function removeItem(productId: string, size: string) {
    const current = getCart().filter(
      (i) => !(i.productId === productId && i.size === size)
    );
    saveCart(current);
  }

  function updateQuantity(productId: string, size: string, quantity: number) {
    const current = getCart();
    const index = current.findIndex(
      (i) => i.productId === productId && i.size === size
    );
    if (index >= 0) {
      if (quantity <= 0) {
        current.splice(index, 1);
      } else {
        current[index].quantity = quantity;
      }
    }
    saveCart(current);
  }

  function clearCart() {
    saveCart([]);
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
