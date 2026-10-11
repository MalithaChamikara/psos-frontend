import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../api/ordersApi";
import type { apiError } from "../api/apiError";
import type { Order } from "../types";

export const myOrdersKey = ["orders", "mine"] as const;

export function useMyOrders() {
  return useQuery<Order[], apiError>({
    queryKey: myOrdersKey,
    queryFn: getMyOrders,
  });
}