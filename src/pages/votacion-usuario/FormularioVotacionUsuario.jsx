import { useRef, useState } from "react";
import { ButtonCustom, InputCustom } from "../../components";
import { MdDeleteForever } from "react-icons/md";
import { NotificationError, NotificationWarning } from "../../utilities";
import { getUsuarioByCorreoCedula } from "../../services";

const FormularioVotacionUsuario = ({ isValidate, setIdUsuario, setIsModal, setIsValidate }) => {
  const [nameVotante, setNameVotante] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { correo_usuario, cedula_usuario } = e.target;
    const payload = {
      correo_usuario: correo_usuario.value,
      cedula_usuario: cedula_usuario.value
    };

    try {
      await getUsuarioByCorreoCedula(payload).then((res) => {
        if (res.status === 200) {
          setNameVotante(res.data.data.nombre_completo);
          setIdUsuario(res.data.data.id_usuario);
          setTimeout(() => {
            setIsModal(true);
          }, 2000);
        } else {
          NotificationError("Error al ingresar");
          return;
        }
      });
    } catch (error) {

      if (!error.response) {
        NotificationError("Error al ingresar");
        return;
      }

      if (error.response.data.error.message === "Usuario no exist") {
        setNameVotante("");
        setIdUsuario("");
        setIsValidate([]);
        NotificationWarning("Usuario no encontrado");
        return;
      }
    }
  };

  const formRef = useRef(null);

  const handleReset = () => {
    setNameVotante("");
    setIdUsuario("");
    setIsValidate([]);
    formRef.current.reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 w-[70%] border shadow-md p-8 grid grid-cols-2 gap-x-4 relative"
    >
      <div className="cursor-pointer absolute right-2 top-2 text-red-400 w-6" onClick={handleReset}>
        <MdDeleteForever className="w-6" />
      </div>
      <div>
        <div className="mb-4">
          <label htmlFor="correo_usuario" className="text-xs font-bold">
            Correo Electronico
          </label>

          <InputCustom type="email" name="correo_usuario" id="correo_usuario" />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label htmlFor="cedula_usuario" className="text-xs font-bold">
            Número de Documento
          </label>

          <InputCustom name="cedula_usuario" id="cedula_usuario" />
        </div>
      </div>
      <div className="col-span-2">
        <div className="mb-4">
          <label className="text-xs font-bold">Nombre completo</label>

          <InputCustom disabled defaultValue={nameVotante} classStyle={"cursor-not-allowed"} />
        </div>
      </div>
      <div className="col-span-2 mt-6 flex justify-end">
        <ButtonCustom
          disabled={isValidate.length > 0}
          widthButton="w-[150px]"
          bgButton="bg-colorPrimary"
          bgButtonHover="hover:bg-colorPrimary/90"
          text="Ingresar"
          textWeight="font-bold"
          textColor="text-colorText"
          textSize="text-[13px]"
          type="submit"
        />
      </div>
    </form>
  );
};
export default FormularioVotacionUsuario;
