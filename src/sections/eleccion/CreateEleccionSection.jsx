import { ButtonCustom, InputCustom } from "../../components";
import useCreateEleccion from "../../hooks/eleccion/useCreateEleccion";

const CreateEleccionSection = () => {
  const { handleChange, handleSubmitSection, values, estados, loading } =
    useCreateEleccion();

  return (
    <form
      onSubmit={handleSubmitSection}
      className="bg-white p-8 flex flex-col justify-center items-start"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg shadow-md border p-8 w-[70%]">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="col-span-2">
            <label htmlFor="nombre_eleccion" className="block text-sm font-bold text-gray-800">
              Nombre Elección <span className="text-red-600">*</span>
            </label>
            <InputCustom
              name="nombre_eleccion"
              id="nombre_eleccion"
              value={values.nombre_eleccion}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="descripcion_eleccion" className="block text-sm font-bold text-gray-800">
              Descripción <span className="text-red-600">*</span>
            </label>
            <textarea
              name="descripcion_eleccion"
              id="descripcion_eleccion"
              value={values.descripcion_eleccion}
              onChange={handleChange}
              className="text-sm outline-none block w-full border border-gray-300 rounded-lg shadow-sm p-2 resize-none"
            />
          </div>
          <div>
            <label htmlFor="fecha_ini_eleccion" className="block text-sm font-bold text-gray-800">
              Fecha Inicial <span className="text-red-600">*</span>
            </label>
            <InputCustom
              type="date"
              name="fecha_ini_eleccion"
              id="fecha_ini_eleccion"
              value={values.fecha_ini_eleccion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="fecha_fin_eleccion" className="block text-sm font-bold text-gray-800">
              Fecha De Finalización <span className="text-red-600">*</span>
            </label>
            <InputCustom
              value={values.fecha_fin_eleccion}
              onChange={handleChange}
              type="date"
              name="fecha_fin_eleccion"
              id="fecha_fin_eleccion"
            />
          </div>

          <div>
            <label htmlFor="hora_ini_eleccion" className="block text-sm font-bold text-gray-800">
              Hora Inicial <span className="text-red-600">*</span>
            </label>
            <InputCustom
              value={values.hora_ini_eleccion}
              onChange={handleChange}
              type="time"
              name="hora_ini_eleccion"
              id="hora_ini_eleccion"
            />
          </div>

          <div>
            <label htmlFor="hora_fin_eleccion" className="block text-sm font-bold text-gray-800">
              Hora De Finalización <span className="text-red-600">*</span>
            </label>
            <InputCustom
              value={values.hora_fin_eleccion}
              onChange={handleChange}
              type="time"
              name="hora_fin_eleccion"
              id="hora_fin_eleccion"
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
              {loading ? (
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
        </div>
        <div className="col-span-2 mt-6 flex justify-end space-x-4 h-[40px]">
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
      </div>
    </form>
  );
};
export default CreateEleccionSection;
