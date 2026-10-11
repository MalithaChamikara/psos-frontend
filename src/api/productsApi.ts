import { api } from "./client";
import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/api/products");
  return data;
}

export async function getLowStockProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/api/products/low-stock");
  return data;
}