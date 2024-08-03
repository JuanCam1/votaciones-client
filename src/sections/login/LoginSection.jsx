import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { useLogin } from "../../hooks";
import { ButtonCustom, InputCustom } from "../../components";
import { useNavigate } from "react-router-dom";
import { NotificationError } from "../../utilities";
import { useAuthStore } from "../../store/auth.store";

const LoginSection = () => {
  const loginUser = useAuthStore((state) => state.loginUser);
  const navigate = useNavigate();
  const { changeIsVisble, isVisible } = useLogin();

  const handleSubmitLogin = async (evt) => {
    evt.preventDefault();

    const { correo_usuario, password_usuario } = evt.target;

    const values = {
      correo_usuario: correo_usuario.value,
      password_usuario: password_usuario.value
    };

    if (Object.values(values).includes("")) {
      NotificationError("Datos incompletos");
    }

    try {
      await loginUser(values);
      navigate("/dash");
    } catch (error) {
      if (error === "Inactive") {
        NotificationError("Usuario Inactivo");
        return;
      }
      if (error === "Incorrect") {
        NotificationError("Datos Incorrectos");
        return;
      }
      NotificationError("Error al ingresar");
    }
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmitLogin}>
        <div className="mb-4">
          <label htmlFor="correo_usuario" className="text-xs font-bold">
            Correo electrónico
          </label>

          <InputCustom
            autoFocus
            name="correo_usuario"
            id="correo_usuario"
            placeholder="correo@correo.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password_usuario" className="text-xs font-bold">
            Contraseña
          </label>
          <div className="flex outline-none w-full border border-gray-300 rounded-lg shadow-sm ">
            <InputCustom
              name="password_usuario"
              id="password_usuario"
              type={isVisible ? "password" : "text"}
              placeholder="******"
              classStyle={"w-[90%] border-none"}
            />

            {isVisible ? (
              <span onClick={changeIsVisble} className="p-2 cursor-pointer">
                <FaEye size={20} color="#562b78" />
              </span>
            ) : (
              <span onClick={changeIsVisble} className="p-2  cursor-pointer">
                <FaEyeSlash size={20} color="#562b78" />
              </span>
            )}
          </div>
        </div>
        <ButtonCustom
          widthButton="w-full"
          bgButton="bg-colorPrimary"
          bgButtonHover="hover:bg-colorPrimary/90"
          text="Iniciar Sesión"
          textSize="text-[13px]"
          textColor="text-colorText"
          textWeight="font-bold"
          type="submit"
        />
      </form>
    </>
  );
};
export default LoginSection;
