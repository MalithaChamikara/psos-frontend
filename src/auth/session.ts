import type { LoginResponse } from "../types";

const KEY = "psos.session";
const storage = sessionStorage; 

export function loadSession(): LoginResponse | null {
  const raw = storage.getItem(KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as LoginResponse;
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      storage.removeItem(KEY);
      return null;
    }
    return session;
  } catch {
    storage.removeItem(KEY);
    return null;
  }
}

export function saveSession(session: LoginResponse): void {
  storage.setItem(KEY, JSON.stringify(session));
}

export function clearSession(): void {
  storage.removeItem(KEY);
}