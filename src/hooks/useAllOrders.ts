import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/ordersApi";
import type { apiError } from "../api/apiError";
import type { Order } from "../types";

export const allOrdersKey = ["orders", "all"] as const;

export function useAllOrders() {
  return useQuery<Order[], apiError>({
    queryKey: allOrdersKey,
    queryFn: getAllOrders,
  });
}