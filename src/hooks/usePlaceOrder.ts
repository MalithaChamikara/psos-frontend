import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrder } from "../api/ordersApi";
import type { apiError } from "../api/apiError";
import { useCartStore } from "../stores/cartStore";
import type { PlaceOrderRequest, PlaceOrderResult } from "../types";
import { productsKey } from "./useProducts";



export function usePlaceOrder() {
  const queryClient = useQueryClient();
  const clearCart = useCartStore((s) => s.clear);

  return useMutation<PlaceOrderResult, apiError, PlaceOrderRequest>({
    mutationFn: placeOrder,

    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: productsKey });
    },

    onError: (error) => {
      if (error.isInsufficientStock) {
        queryClient.invalidateQueries({ queryKey: productsKey });
      }
    },
  });
}