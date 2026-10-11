import { api } from "./client";
import type { Order, PlaceOrderRequest, PlaceOrderResult } from "../types";

export async function placeOrder(request: PlaceOrderRequest): Promise<PlaceOrderResult> {
  const { data } = await api.post<PlaceOrderResult>("/api/orders", request);
  return data;
}

export async function getMyOrders(): Promise<Order[]> {
  const { data } = await api.get<Order[]>("/api/orders/my-orders");
  return data;
}

export async function getAllOrders(): Promise<Order[]> {
  const { data } = await api.get<Order[]>("/api/orders");
  return data;
}