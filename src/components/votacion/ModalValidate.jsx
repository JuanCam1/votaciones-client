import { useState } from "react";
import ButtonCustom from "../ui/ButtonCustom";
import InputOTP from "../ui/InputOTP";
import Modal from "../ui/Modal";
import { NotificationError, NotificationSucces } from "../../utilities";
import { validateTokenVotante } from "../../services";

const ModalValidate = ({ setIsValidate, idVotante, isOpen, onClose }) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (otp.length < 6) {
      NotificationError("Ingrese un código válido");
      return;
    }

    const payload = {
      id_votante: idVotante,
      token: otp
    };

    try {
      await validateTokenVotante(payload).then((res) => {
        
        if (res.status === 202) {
          NotificationSucces("Votante validado correctamente");
          setIsValidate(res.data.data);
          onClose();
        }
      });
    } catch (error) {
      if (!error.response) {
        NotificationError("Error al validar votante");
        return;
      }

      if (error.response.data.error.message === "Token no valido") {
        NotificationError("Token no valido");
        return;
      }
    }
  };
  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={""}
      mostrarHeader={true}
      mostrarOverlay={true}
      posicionModal={"center"}
      padding={"p-5"}
      heighModal={"h-auto"}
      widthModal={"w-[700px]"}
    >
      <div className="flex flex-col justify-center items-center gap-8 ">
        <h1 className="text-2xl font-bold mb-4 text-center">Ingrese su código de verificación</h1>
        <p className="mb-4 text-center text-gray-600 w-[80%]">
          El código de verificación ha sido enviado a su correo electrónico. Por favor, ingrese el
          código a continuación para verificar su identidad y continuar con el proceso.
        </p>
        <form
          onSubmit={handleSubmit}
          className=" w-[80%] bg-white py-10 px-8 rounded-lg shadow-md border relative max-md:w-full max-md:px-4"
        >
          <div className="col-span-2">
            <InputOTP length={6} onChange={handleOtpChange} />
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonCustom
              widthButton="w-[150px] max-md:w-full"
              bgButton="bg-colorPrimary"
              bgButtonHover="hover:bg-colorPrimary/90"
              text="Validar"
              textWeight="font-bold"
              textColor="text-colorText"
              textSize="text-[13px]"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ModalValidate;
