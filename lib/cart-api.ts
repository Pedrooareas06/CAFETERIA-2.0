/**
 * Cart Service - API-backed version
 * Communicates with NestJS backend at /api/cart/*
 * Supports guest users and persists data to MongoDB
 */

import useSWR, { mutate } from "swr";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}

// Use 'guest' user for anonymous shopping, or user ID for logged-in users
const DEFAULT_USER = "guest";

// Fetch wrapper with error handling
async function fetchCart(user: string = DEFAULT_USER): Promise<CartResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart?user=${user}`,
      {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
}

export function useCart(user: string = DEFAULT_USER) {
  const { data, error, isLoading, mutate: refetch } = useSWR<CartResponse>(
    `cart-${user}`,
    () => fetchCart(user),
    {
      fallbackData: { items: [], total: 0 },
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  const items = data?.items || [];
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = data?.total || 0;

  async function addItem(item: Omit<CartItem, "quantity">) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add?user=${user}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`);
      const updated = await res.json();
      mutate(`cart-${user}`, updated, false);
    } catch (error) {
      console.error("Failed to add item:", error);
      throw error;
    }
  }

  async function removeItem(productId: string, size: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/item?user=${user}&productId=${productId}&size=${encodeURIComponent(size)}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`);
      const updated = await res.json();
      mutate(`cart-${user}`, updated, false);
    } catch (error) {
      console.error("Failed to remove item:", error);
      throw error;
    }
  }

  async function updateQuantity(
    productId: string,
    size: string,
    quantity: number
  ) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/quantity?user=${user}&productId=${productId}&size=${encodeURIComponent(size)}&quantity=${quantity}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error(`Failed to update quantity: ${res.status}`);
      const updated = await res.json();
      mutate(`cart-${user}`, updated, false);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      throw error;
    }
  }

  async function clearCart() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/clear?user=${user}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error(`Failed to clear cart: ${res.status}`);
      const updated = await res.json();
      mutate(`cart-${user}`, updated, false);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    }
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
    error,
    refetch,
  };
}
