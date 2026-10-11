import { create } from "zustand";

interface CartState {
  quantities: Record<number, number>;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  quantities: {},

  setQuantity: (productId, quantity) =>
    set((state) => {
      const next = { ...state.quantities };
      if (quantity <= 0) delete next[productId];
      else next[productId] = quantity;
      return { quantities: next };
    }),

  clear: () => set({ quantities: {} }),
}));