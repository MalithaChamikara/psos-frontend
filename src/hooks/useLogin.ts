import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import type { apiError } from "../api/apiError";
import { useAuthStore } from "../stores/authStore";
import type { LoginRequest, LoginResponse } from "../types";

export function useLogin() {
  const signIn = useAuthStore((s) => s.signIn);

  return useMutation<LoginResponse, apiError, LoginRequest>({
    mutationFn: login,
    onSuccess: signIn,
  });
}