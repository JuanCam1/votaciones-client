import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const ProtectedAdminRoutes = () => {
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  if (profilePayload !== "Administrador") {
    return <Navigate to="/dash" />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoutes;
