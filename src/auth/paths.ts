import type { Role } from "../types";

export const homePathBasedOnRole = (role: Role): string =>
  role === "Administrator" ? "/admin" : "/products";