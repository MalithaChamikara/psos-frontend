import { create } from "zustand";
import { queryClient } from "../queryClient";
import { useCartStore } from "../stores/cartStore";
import { clearSession, loadSession, saveSession } from "../auth/session";
import type { LoginResponse } from "../types";

interface AuthState {
  session: LoginResponse | null;
  signIn: (session: LoginResponse) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: loadSession(),

  signIn: (session) => {
    saveSession(session);
    set({ session });
  },

  signOut: () => {
    clearSession();
    queryClient.clear();
    useCartStore.getState().clear();
    set({ session: null });
  },
}));