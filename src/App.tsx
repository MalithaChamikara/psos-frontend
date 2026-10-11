import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import { useAuthStore } from "./stores/authStore";
import { homePathBasedOnRole } from "./auth/paths";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";


export default function App() {
  const session = useAuthStore((s) => s.session);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth roles={["Customer"]}><AppLayout /></RequireAuth>}>
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      <Route element={<RequireAuth roles={["Administrator"]}><AppLayout /></RequireAuth>}>
        <Route path="/admin" element={<AdminPage/>} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={session ? homePathBasedOnRole(session.role) : "/login"} replace />}
      />
    </Routes>
  );
}