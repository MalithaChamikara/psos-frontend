import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsApi";
import type { apiError } from "../api/apiError";
import type { Product } from "../types";

export const productsKey = ["products"] as const;

export function useProducts() {
  return useQuery<Product[], apiError>({
    queryKey: productsKey,
    queryFn: getProducts,
  });
}