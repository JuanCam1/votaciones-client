import { useState } from "react";
import { NotificationError } from "../../utilities";
// import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  // const loginUser = useAuthStore((state) => state.loginUser);
  const [isVisible, setIsVisible] = useState(true);

  const handleLogin = async (values) => {
    // try {
    //   await loginUser(values);
    //   navigate("/dash");
    // } catch (error) {
    //   if (error === "Inactive") {
    //     NotificationError("Usuario Inactivo");
    //     return;
    //   }
    //   if (error === "Incorrect") {
    //     NotificationError("Datos incompletos");
    //     return;
    //   }
    //   NotificationError("Error al ingresar");
    // }
  };

  const changeIsVisble = () => {
    setIsVisible(!isVisible);
  };

  return {
    handleLogin,
    changeIsVisble,
    isVisible
  };
};
export default useLogin;
