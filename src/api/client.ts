import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { toApiError } from "./apiError";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
}); 

api.interceptors.request.use((config) => {
  const session = useAuthStore.getState().session;
  if (session) config.headers.Authorization = `Bearer ${session.token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = toApiError(error);
    const isLoginCall = error?.config?.url?.includes("/api/auth/login");

    if (apiError.status === 401 && !isLoginCall) {
      useAuthStore.getState().signOut();
    }
    return Promise.reject(apiError);
  },
);