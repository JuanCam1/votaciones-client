import Modal from "../ui/Modal";
import Checkbox from "../ui/Checkbox";
import InputCustom from "../ui/InputCustom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRole, useUpdateUser } from "../../hooks";
import ButtonCustom from "../ui/ButtonCustom";
import { useAuthStore } from "../../store/auth.store";

const ModalUsuarioDetail = ({ selected, isOpen, onClose, setIsEdit }) => {
  if (Object.values(selected).includes("") || Object.values(selected).includes(undefined)) {
    onClose();
  }

  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  const {
    handleChangeImage,
    handleChange,
    handleSubmit,
    changeEdit,
    photoPreview,
    isCheck,
    usuario,
    changeIsVisble,
    isVisibleConfirm,
    isVisiblePass
  } = useUpdateUser(selected, setIsEdit, onClose);

  const { roles, loadingRole } = useRole();
  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={"Usuario"}
      mostrarHeader={true}
      mostrarOverlay={true}
      posicionModal={"center"}
      padding={"p-5"}
      heighModal={"h-auto"}
      widthModal={"w-[1200px]"}
    >
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border relative">
        {profilePayload === "Administrador" && (
            <Checkbox isCheck={isCheck} changeEdit={changeEdit} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cedula_usuario" className="block text-sm font-bold text-gray-800">
                  Cedula <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  value={usuario.cedula_usuario}
                  onChange={handleChange}
                  name="cedula_usuario"
                  id="cedula_usuario"
                />
              </div>
              <div>
                <label htmlFor="nombre_usuario" className="block text-sm font-bold text-gray-800">
                  Nombres <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  value={usuario.nombre_usuario}
                  onChange={handleChange}
                  name="nombre_usuario"
                  id="nombre_usuario"
                />
              </div>

              <div>
                <label htmlFor="lastname_usuario" className="block text-sm font-bold text-gray-800">
                  Apellidos <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  value={usuario.lastname_usuario}
                  onChange={handleChange}
                  name="lastname_usuario"
                  id="lastname_usuario"
                />
              </div>

              <div>
                <label htmlFor="correo_usuario" className="block text-sm font-bold text-gray-800">
                  Correo <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  value={usuario.correo_usuario}
                  onChange={handleChange}
                  name="correo_usuario"
                  id="correo_usuario"
                />
              </div>

              <div>
                <label htmlFor="role_id" className="block text-sm font-bold text-gray-800">
                  Perfil <span className="text-red-600">*</span>
                </label>
                <select
                  id="role_id"
                  name="role_id"
                  value={usuario.role_id}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="0">Seleccione el perfil</option>
                  {loadingRole ? (
                    <option value="0">Cargando Perfiles</option>
                  ) : roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role.id_role} value={role.id_role}>
                        {role.nombre_role}
                      </option>
                    ))
                  ) : (
                    <option value="0">No hay perfiles</option>
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="password_usuario"
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
                  value={usuario.password_usuario}
                  onChange={handleChange}
                  name="password_usuario"
                  id="password_usuario"
                  type={isVisiblePass ? "password" : "text"}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password_usuario"
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
                  value={usuario.confirm_password_usuario}
                  onChange={handleChange}
                  name="confirm_password_usuario"
                  id="confirm_password_usuario"
                  type={isVisibleConfirm ? "password" : "text"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800">Foto de perfil</label>
                <input
                  disabled={!isCheck}
                  onChange={handleChangeImage}
                  accept="image/png, image/jpeg, image/jpg"
                  type="file"
                  className="cursor-pointer block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-colorPrimary/90 file:text-colorText hover:file:bg-colorPrimary file:disabled:opacity-50 file:disabled:pointer-events-none "
                />
              </div>
            </div>
            <div className="flex justify-center items-start">
              <img
                src={photoPreview}
                alt="Foto de Perfil"
                className="size-52 rounded-md shadow-md"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4 h-[40px]">
            {isCheck && (
              <ButtonCustom
                widthButton="w-[150px]"
                bgButton="bg-colorPrimary"
                bgButtonHover="hover:bg-colorPrimary/90"
                text="Guardar"
                textWeight="font-bold"
                textColor="text-colorText"
                textSize="text-[13px]"
                type="submit"
              />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUsuarioDetail;
