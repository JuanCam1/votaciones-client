import { useState } from "react";
import imgLogo from "../../assets/statics/no-user.webp";
import { ButtonCustom, InputCustom } from "../../components";
import { useCreateCandidato, useEstado } from "../../hooks";

const CreateCandidatoSection = () => {
  const [photoPreview, setPhotoPreview] = useState(imgLogo);
  const { values, handleChange, handleSubmitSection, handleChangeImage } =
    useCreateCandidato(setPhotoPreview);

  const { estados, loadingEstado } = useEstado();

  return (
    <form
      onSubmit={handleSubmitSection}
      className="bg-white p-8 rounded-lg shadow-md border relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cedula_candidato" className="block text-sm font-bold text-gray-800">
              Cedula
            </label>
            <InputCustom
              value={values.cedula_candidato}
              onChange={handleChange}
              name="cedula_candidato"
              id="cedula_candidato"
            />
          </div>
          <div>
            <label htmlFor="nombre_candidato" className="block text-sm font-bold text-gray-800">
              Nombre
            </label>
            <InputCustom
              value={values.nombre_candidato}
              onChange={handleChange}
              name="nombre_candidato"
              id="nombre_candidato"
            />
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
export default CreateCandidatoSection;
