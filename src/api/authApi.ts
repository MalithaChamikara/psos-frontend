import { api } from "./client";
import type { LoginRequest, LoginResponse } from "../types";

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/auth/login", request);
  return data;
}