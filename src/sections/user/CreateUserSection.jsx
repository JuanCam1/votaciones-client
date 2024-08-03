import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ButtonCustom, InputCustom } from "../../components";
import { useCreateUser, useEstado, useRole } from "../../hooks";
import { useState } from "react";
import imgLogo from "../../assets/statics/no-user.webp";

const CreateUserSection = () => {
  const [photoPreview, setPhotoPreview] = useState(imgLogo);
  const {
    values,
    isVisiblePass,
    isVisibleConfirm,
    handleChangeImage,
    handleChange,
    changeIsVisble,
    handleSubmitSection
  } = useCreateUser(setPhotoPreview);

  const { estados, loadingEstado } = useEstado();
  const { roles, loadingRole } = useRole();

  return (
    <form
      onSubmit={handleSubmitSection}
      className="bg-white p-8 rounded-lg shadow-md border relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cedula_usuario" className="block text-sm font-bold text-gray-800">
              Cedula <span className="text-red-600">*</span>
            </label>
            <InputCustom
              value={values.cedula_usuario}
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
              value={values.nombre_usuario}
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
              value={values.lastname_usuario}
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
              value={values.correo_usuario}
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
              value={values.role_id}
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
            <label htmlFor="estado_id" className="block text-sm font-bold text-gray-800">
              Estado <span className="text-red-600">*</span>
            </label>
            <select
              value={values.estado_id}
              onChange={handleChange}
              id="estado_id"
              name="estado_id"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="0">Seleccione el estado</option>
              {loadingEstado ? (
                <option value="0">Cargando Estados</option>
              ) : estados.length > 0 ? (
                estados.map((estado) => (
                  <option key={estado.id_estado} value={estado.id_estado}>
                    {estado.nombre_estado}
                  </option>
                ))
              ) : (
                <option value="0">No hay estados</option>
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
                <span onClick={() => changeIsVisble("password")} className="p-1  cursor-pointer">
                  <FaEyeSlash size={20} className="text-colorSecundary ml-2" />
                </span>
              )}
            </label>
            <InputCustom
              value={values.password_usuario}
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
              value={values.confirm_password_usuario}
              onChange={handleChange}
              name="confirm_password_usuario"
              id="confirm_password_usuario"
              type={isVisibleConfirm ? "password" : "text"}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800">Foto de perfil</label>
            <input
              onChange={handleChangeImage}
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              className="cursor-pointer block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-colorPrimary/90 file:text-colorText hover:file:bg-colorPrimary file:disabled:opacity-50 file:disabled:pointer-events-none "
            />
          </div>
        </div>
        <div className="flex justify-center items-start">
          <img src={photoPreview} alt="Foto de Perfil" className="size-52 rounded-md shadow-md" />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4 h-[40px]">
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
      </div>
    </form>
  );
};
export default CreateUserSection;
