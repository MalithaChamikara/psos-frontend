export const LOW_STOCK_THRESHOLD = 5;

export type StockStatus = "out" | "low" | "ok";

export function stockStatus(stockQuantity: number): StockStatus {
  if (stockQuantity <= 0) return "out";
  if (stockQuantity <= LOW_STOCK_THRESHOLD) return "low";
  return "ok";
}