import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts } from "../api/productsApi";
import type { apiError } from "../api/apiError";
import type { Product } from "../types";

export const lowStockKey = ["products", "low-stock"] as const;

export function useLowStock() {
  return useQuery<Product[], apiError>({
    queryKey: lowStockKey,
    queryFn: getLowStockProducts,
  });
}