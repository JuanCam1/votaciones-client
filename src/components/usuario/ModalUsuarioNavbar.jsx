import { useState } from "react";
import Modal from "../ui/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputCustom from "../ui/InputCustom";
import ButtonCustom from "../ui/ButtonCustom";
import { updateUsuarioNavbar } from "../../services/user/user.services";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import { useAuthStore } from "../../store/auth.store";

const ModalUserNavbar = ({ userName, photoUser, isOpen, onClose }) => {
  const dataUser = useAuthStore((state) => state.dataUser || {});
  const [photoUpdate, setPhotoUpdate] = useState(null);

  const [photoPreview, setPhotoPreview] = useState(photoUser);
  const [isVisiblePass, setIsVisiblePass] = useState(true);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(true);

  const changeIsVisble = (option) => {
    if (option === "password") {
      setIsVisiblePass(!isVisiblePass);
    } else {
      setIsVisibleConfirm(!isVisibleConfirm);
    }
  };

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    const pahtUrl = URL.createObjectURL(file);
    setPhotoUpdate(file);
    setPhotoPreview(pahtUrl);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { password_user, confirm_password_user } = e.target;

    if (password_user.value !== confirm_password_user.value) {
      NotificationError("Contraseñas no coinciden");
      return;
      // setIsEdit(true)
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password_user.value)) {
      NotificationError(
        "La contraseña debe tener al menos 6 caracteres, incluyendo mayúsculas, minúsculas, números y un símbolo."
      );
      return;
    }

    const values = {
      id_usuario: dataUser.id_usuario,
      correo_usuario: dataUser.correo_usuario,
      password_usuario: password_user.value,
      foto_usuario: photoUpdate
    };

    try {
      await updateUsuarioNavbar(values).then((res) => {
        if (validateStatus(res.status)) {
          throw Error();
        } else {
          NotificationSucces("Usuario actualizado correctamente");
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      });
    } catch (err) {
      NotificationError("Error al actualizar datos");
    }
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={userName}
      mostrarHeader={true}
      mostrarOverlay={true}
      posicionModal={"center"}
      padding={"p-5"}
      heighModal={"h-auto"}
      widthModal={"w-[800px]"}
    >
      <div className="flex flex-col">
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md border relative">
          <div className="flex flex-col mt-2 gap-4">
            <div className="flex justify-center items-start">
              <img
                src={photoPreview}
                alt="Foto de Perfil"
                className="size-52 rounded-md shadow-md"
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password_user"
                  className="flex items-center  text-sm font-bold text-gray-800"
                >
                  Contraseña
                  {isVisiblePass ? (
                    <span onClick={() => changeIsVisble("password")} className="p-1 cursor-pointer">
                      <FaEye size={20} className="text-colorSecundary ml-2" />
                    </span>
                  ) : (
                    <span
                      onClick={() => changeIsVisble("password")}
                      className="p-1  cursor-pointer"
                    >
                      <FaEyeSlash size={20} className="text-colorSecundary ml-2" />
                    </span>
                  )}
                </label>
                <InputCustom
                  name="password_user"
                  id="password_user"
                  type={isVisiblePass ? "password" : "text"}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password_user"
                  className="flex items-center text-sm font-bold text-gray-800"
                >
                  Confirmar Contraseña
                  {isVisibleConfirm ? (
                    <span onClick={() => changeIsVisble("confirm")} className="p-1 cursor-pointer">
                      <FaEye size={20} className="text-colorSecundary ml-2" />
                    </span>
                  ) : (
                    <span onClick={() => changeIsVisble("confirm")} className="p-1  cursor-pointer">
                      <FaEyeSlash size={20} className="text-colorSecundary ml-2" />
                    </span>
                  )}
                </label>
                <InputCustom
                  name="confirm_password_user"
                  id="confirm_password_user"
                  type={isVisibleConfirm ? "password" : "text"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800">Foto de perfil</label>
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleChangeImage}
                  type="file"
                  className="cursor-pointer block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-colorPrimary/90 file:text-colorText hover:file:bg-colorPrimary file:disabled:opacity-50 file:disabled:pointer-events-none "
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4 h-[40px]">
              <ButtonCustom
                widthButton="w-[150px]"
                bgButton="bg-colorPrimary"
                bgButtonHover="hover:bg-colorPrimary/90"
                text="Actualizar"
                textColor="text-colorText"
                textWeight="font-semibold"
                textSize="text-[13px]"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUserNavbar;
