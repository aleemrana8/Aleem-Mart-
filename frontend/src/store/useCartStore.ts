import { create } from 'zustand';
import api from '@/lib/api';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    slug: string;
    images: string[];
    price: number;
    stock: number;
  };
  variant?: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number, variant?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,

  fetchCart: async () => {
    try {
      const { data } = await api.get('/cart');
      set({
        items: data.data.items,
        totalItems: data.data.totalItems,
        totalPrice: data.data.totalPrice,
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  },

  addToCart: async (productId: string, quantity = 1, variant?: string) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/cart/add', { productId, quantity, variant });
      set({
        items: data.data.items,
        totalItems: data.data.totalItems,
        totalPrice: data.data.totalPrice,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateQuantity: async (itemId: string, quantity: number) => {
    try {
      const { data } = await api.put(`/cart/item/${itemId}`, { quantity });
      set({
        items: data.data.items,
        totalItems: data.data.totalItems,
        totalPrice: data.data.totalPrice,
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  },

  removeItem: async (itemId: string) => {
    try {
      const { data } = await api.delete(`/cart/item/${itemId}`);
      set({
        items: data.data.items,
        totalItems: data.data.totalItems,
        totalPrice: data.data.totalPrice,
      });
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  },

  clearCart: async () => {
    try {
      await api.delete('/cart/clear');
      set({ items: [], totalItems: 0, totalPrice: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  },
}));
