import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages";
import { useAuthStore } from "../store/auth.store";

const ValidateRoutes = () => {
  const userPayload = useAuthStore((state) => state.dataUser || null);
  const tokenPayload = useAuthStore((state) => state.token || null);
  const storagePayload = JSON.parse(localStorage.getItem("auth-storage")) || null;

  if (tokenPayload === storagePayload.state.token && userPayload && storagePayload.state.dataUser) {
    return <Navigate to="/dash" />;
  }

  return <LoginPage />;
};

export default ValidateRoutes;
