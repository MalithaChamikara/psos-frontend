export type Role = "Customer" | "Administrator";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: Role;
  expiresAt: string;
}

export interface Product {
  productId: number;
  name: string;
  price: number;
  stockQuantity: number;
}

export interface OrderLineRequest {
  productId: number;
  quantity: number;
}

export interface PlaceOrderRequest {
  items: OrderLineRequest[];
}

export interface PlaceOrderResult {
  success: boolean;
  orderId: number;
  totalAmount: number;
  shortages: StockShortage[];
}

export interface StockShortage {
  productId: number;
  productName: string;
  available: number;
  requested: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderId: number;
  userId: number;
  username: string | null;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}