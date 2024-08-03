import { ButtonCustom, InputCustom } from "../../components";
import { useCreateCandidato } from "../../hooks";

const CreateVotanteSection = () => {
  const { elecciones, loadingElec, values, handleChange, handleSubmitSection, handleChangeImage } =
    useCreateCandidato();

  return (
    <form
      onSubmit={handleSubmitSection}
      className="bg-white p-8 rounded-lg shadow-md border relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="cedula_votante" className="block text-sm font-bold text-gray-800">
              Cédula
            </label>
            <InputCustom
              value={values.cedula_votante}
              onChange={handleChange}
              name="cedula_votante"
              id="cedula_votante"
            />
          </div>
          <div>
            <label
              htmlFor="fecha_expedicion_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Fecha Expedición
            </label>
            <InputCustom
              value={values.fecha_expedicion_votante}
              onChange={handleChange}
              name="fecha_expedicion_votante"
              id="fecha_expedicion_votante"
            />
          </div>
          <div>
            <label
              htmlFor="fecha_nacimiento_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Fecha Nacimiento
            </label>
            <InputCustom
              value={values.fecha_nacimiento_votante}
              onChange={handleChange}
              name="fecha_nacimiento_votante"
              id="fecha_nacimiento_votante"
            />
          </div>
          <div>
            <label
              htmlFor="fecha_ingreso_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Fecha ingreso
            </label>
            <InputCustom
              value={values.fecha_ingreso_votante}
              onChange={handleChange}
              name="fecha_ingreso_votante"
              id="fecha_ingreso_votante"
            />
          </div>
          <div>
            <label
              htmlFor="primer_nombre_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Primer Nombre
            </label>
            <InputCustom
              value={values.primer_nombre_votante}
              onChange={handleChange}
              name="primer_nombre_votante"
              id="primer_nombre_votante"
            />
          </div>

          <div>
            <label
              htmlFor="segundo_nombre_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Segundo Nombre
            </label>
            <InputCustom
              value={values.segundo_nombre_votante}
              onChange={handleChange}
              name="segundo_nombre_votante"
              id="segundo_nombre_votante"
            />
          </div>

          <div>
            <label
              htmlFor="primer_apellido_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Primer Apellido
            </label>
            <InputCustom
              value={values.primer_apellido_votante}
              onChange={handleChange}
              name="primer_apellido_votante"
              id="primer_apellido_votante"
            />
          </div>

          <div>
            <label
              htmlFor="segundo_apellido_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Segundo Apellido
            </label>
            <InputCustom
              value={values.segundo_apellido_votante}
              onChange={handleChange}
              name="segundo_apellido_votante"
              id="segundo_apellido_votante"
            />
          </div>

          <div>
            <label
              htmlFor="correo_corporativo_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Correo Corporativo
            </label>
            <InputCustom
              value={values.correo_corporativo_votante}
              onChange={handleChange}
              name="correo_corporativo_votante"
              id="correo_corporativo_votante"
            />
          </div>

          <div>
            <label
              htmlFor="correo_personal_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Correo Personal
            </label>
            <InputCustom
              value={values.correo_personal_votante}
              onChange={handleChange}
              name="correo_personal_votante"
              id="correo_personal_votante"
            />
          </div>

          <div>
            <label htmlFor="telefono_votante" className="block text-sm font-bold text-gray-800">
              Telefono
            </label>
            <InputCustom
              value={values.telefono_votante}
              onChange={handleChange}
              name="telefono_votante"
              id="telefono_votante"
            />
          </div>

          <div>
            <label htmlFor="carrera_votante" className="block text-sm font-bold text-gray-800">
              De Carrera
            </label>
            <InputCustom
              value={values.carrera_votante}
              onChange={handleChange}
              name="carrera_votante"
              id="carrera_votante"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_dependencia_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Nombre Dependencia
            </label>
            <InputCustom
              value={values.nombre_dependencia_votante}
              onChange={handleChange}
              name="nombre_dependencia_votante"
              id="nombre_dependencia_votante"
            />
          </div>

          <div>
            <label htmlFor="nombre_nivel_votante" className="block text-sm font-bold text-gray-800">
              Nivel
            </label>
            <InputCustom
              value={values.nombre_nivel_votante}
              onChange={handleChange}
              name="nombre_nivel_votante"
              id="nombre_nivel_votante"
            />
          </div>

          <div>
            <label htmlFor="codigo_cargo_votante" className="block text-sm font-bold text-gray-800">
              Código Cargo
            </label>
            <InputCustom
              value={values.codigo_cargo_votante}
              onChange={handleChange}
              name="codigo_cargo_votante"
              id="codigo_cargo_votante"
            />
          </div>

          <div>
            <label htmlFor="nombre_cargo_votante" className="block text-sm font-bold text-gray-800">
              Nombre Cargo
            </label>
            <InputCustom
              value={values.nombre_cargo_votante}
              onChange={handleChange}
              name="nombre_cargo_votante"
              id="nombre_cargo_votante"
            />
          </div>

          <div>
            <label htmlFor="grado_votante" className="block text-sm font-bold text-gray-800">
              Grado
            </label>
            <InputCustom
              value={values.grado_votante}
              onChange={handleChange}
              name="grado_votante"
              id="grado_votante"
            />
          </div>

          <div>
            <label
              htmlFor="codigo_categoria_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Código Categoría
            </label>
            <InputCustom
              value={values.codigo_categoria_votante}
              onChange={handleChange}
              name="codigo_categoria_votante"
              id="codigo_categoria_votante"
            />
          </div>

          <div>
            <label
              htmlFor="codigo_escalafon_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Código Escalfón
            </label>
            <InputCustom
              value={values.codigo_escalafon_votante}
              onChange={handleChange}
              name="codigo_escalafon_votante"
              id="codigo_escalafon_votante"
            />
          </div>

          <div>
            <label
              htmlFor="codigo_municipio_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Código Municipio
            </label>
            <InputCustom
              value={values.codigo_municipio_votante}
              onChange={handleChange}
              name="codigo_municipio_votante"
              id="codigo_municipio_votante"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_municipio_votante"
              className="block text-sm font-bold text-gray-800"
            >
              Ciudad
            </label>
            <InputCustom
              value={values.nombre_municipio_votante}
              onChange={handleChange}
              name="nombre_municipio_votante"
              id="nombre_municipio_votante"
            />
          </div>
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
export default CreateVotanteSection;
