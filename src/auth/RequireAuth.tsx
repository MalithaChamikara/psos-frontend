import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { homePathBasedOnRole } from "./paths";
import type { Role } from "../types";

interface Props {
  roles?: Role[];
  children: ReactNode;
}

export default function RequireAuth({ roles, children }: Props) {
  const session = useAuthStore((s) => s.session);
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (roles && !roles.includes(session.role)) {
    return <Navigate to={homePathBasedOnRole(session.role)} replace />;
  }
  return <>{children}</>;
}