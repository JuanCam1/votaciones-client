import { useUpdateVotante } from "../../hooks";
import { useAuthStore } from "../../store/auth.store";
import ButtonCustom from "../ui/ButtonCustom";
import Checkbox from "../ui/Checkbox";
import InputCustom from "../ui/InputCustom";
import Modal from "../ui/Modal";

const ModalVotanteDetail = ({ selected, isOpen, onClose, setIsEdit }) => {
  if (Object.values(selected).includes("") || Object.values(selected).includes(undefined)) {
    onClose();
  }

  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  const { isCheck, changeEdit, handleSubmit } = useUpdateVotante(
    selected.id_votante,
    setIsEdit,
    onClose
  );
  
  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={"Votante"}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label htmlFor="cedula_votante" className="block text-sm font-bold text-gray-800">
                  Cédula <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.cedula_votante}
                  name="cedula_votante"
                  id="cedula_votante"
                />
              </div>
              <div>
                <label
                  htmlFor="fecha_expedicion_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Fecha Expedición <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.fecha_expedicion_votante}
                  name="fecha_expedicion_votante"
                  id="fecha_expedicion_votante"
                  type="date"
                />
              </div>
              <div>
                <label
                  htmlFor="fecha_nacimiento_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Fecha Nacimiento <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.fecha_nacimiento_votante}
                  name="fecha_nacimiento_votante"
                  id="fecha_nacimiento_votante"
                  type="date"
                />
              </div>
              <div>
                <label
                  htmlFor="fecha_ingreso_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Fecha ingreso <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  type="date"
                  disabled={!isCheck}
                  defaultValue={selected.fecha_ingreso_votante}
                  name="fecha_ingreso_votante"
                  id="fecha_ingreso_votante"
                />
              </div>
              <div>
                <label
                  htmlFor="primer_nombre_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Primer Nombre <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.primer_nombre_votante}
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
                  disabled={!isCheck}
                  defaultValue={selected.segundo_nombre_votante}
                  name="segundo_nombre_votante"
                  id="segundo_nombre_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="primer_apellido_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Primer Apellido <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.primer_apellido_votante}
                  name="primer_apellido_votante"
                  id="primer_apellido_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="segundo_apellido_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Segundo Apellido <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.segundo_apellido_votante}
                  name="segundo_apellido_votante"
                  id="segundo_apellido_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="correo_corporativo_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Correo Corporativo <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  type="email"
                  defaultValue={selected.correo_corporativo_votante}
                  name="correo_corporativo_votante"
                  id="correo_corporativo_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="correo_personal_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Correo Personal <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  type="email"
                  disabled={!isCheck}
                  defaultValue={selected.correo_personal_votante}
                  name="correo_personal_votante"
                  id="correo_personal_votante"
                />
              </div>

              <div>
                <label htmlFor="telefono_votante" className="block text-sm font-bold text-gray-800">
                  Telefono <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  type="number"
                  disabled={!isCheck}
                  defaultValue={selected.telefono_votante}
                  name="telefono_votante"
                  id="telefono_votante"
                />
              </div>

              <div>
                <label htmlFor="carrera_votante" className="block text-sm font-bold text-gray-800">
                  De Carrera <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.carrera_votante}
                  name="carrera_votante"
                  id="carrera_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="nombre_dependencia_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Nombre Dependencia <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.nombre_dependencia_votante}
                  name="nombre_dependencia_votante"
                  id="nombre_dependencia_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="nombre_nivel_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Nivel <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.nombre_nivel_votante}
                  name="nombre_nivel_votante"
                  id="nombre_nivel_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="codigo_cargo_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Código Cargo <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.codigo_cargo_votante}
                  name="codigo_cargo_votante"
                  id="codigo_cargo_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="nombre_cargo_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Nombre Cargo <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.nombre_cargo_votante}
                  name="nombre_cargo_votante"
                  id="nombre_cargo_votante"
                />
              </div>

              <div>
                <label htmlFor="grado_votante" className="block text-sm font-bold text-gray-800">
                  Grado <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.grado_votante}
                  name="grado_votante"
                  id="grado_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="codigo_categoria_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Código Categoría <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.codigo_categoria_votante}
                  name="codigo_categoria_votante"
                  id="codigo_categoria_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="codigo_escalafon_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Código Escalafón <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.codigo_escalafon_votante}
                  name="codigo_escalafon_votante"
                  id="codigo_escalafon_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="nombre_escalafon_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Nombre Escalfón <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.nombre_escalafon_votante}
                  name="nombre_escalafon_votante"
                  id="nombre_escalafon_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="codigo_municipio_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Código Municipio <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.codigo_municipio_votante}
                  name="codigo_municipio_votante"
                  id="codigo_municipio_votante"
                />
              </div>

              <div>
                <label
                  htmlFor="nombre_municipio_votante"
                  className="block text-sm font-bold text-gray-800"
                >
                  Ciudad <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.nombre_municipio_votante}
                  name="nombre_municipio_votante"
                  id="nombre_municipio_votante"
                />
              </div>
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
export default ModalVotanteDetail;
