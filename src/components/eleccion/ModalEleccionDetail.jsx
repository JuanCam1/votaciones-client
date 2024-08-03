import Modal from "../ui/Modal";
import Checkbox from "../ui/Checkbox";
import InputCustom from "../ui/InputCustom";
import { useUpdateEleccion } from "../../hooks";
import ButtonCustom from "../ui/ButtonCustom";
import { useAuthStore } from "../../store/auth.store";

const ModalEleccionDetail = ({ selected, isOpen, onClose, setIsEdit }) => {
  if (Object.values(selected).includes("") || Object.values(selected).includes(undefined)) {
    onClose();
  }
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  const { isCheck, changeEdit, handleSubmit } = useUpdateEleccion(selected.id_eleccion, setIsEdit,onClose);

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={selected.nombre_eleccion}
      mostrarHeader={true}
      mostrarOverlay={true}
      posicionModal={"center"}
      padding={"p-5"}
      heighModal={"h-auto"}
      widthModal={"w-[800px]"}
    >
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border relative">
        {profilePayload === "Administrador" && (
            <Checkbox isCheck={isCheck} changeEdit={changeEdit} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg shadow-md border p-8 ">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="col-span-2">
                <label htmlFor="nombre_eleccion" className="block text-sm font-bold text-gray-800">
                  Nombre Elección <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  name="nombre_eleccion"
                  id="nombre_eleccion"
                  defaultValue={selected.nombre_eleccion}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="descripcion_eleccion"
                  className="block text-sm font-bold text-gray-800"
                >
                  Descripción <span className="text-red-600">*</span>
                </label>
                <textarea
                  disabled={!isCheck}
                  name="descripcion_eleccion"
                  id="descripcion_eleccion"
                  defaultValue={selected.descripcion_eleccion}
                  className="text-sm outline-none block w-full border border-gray-300 rounded-lg shadow-sm p-2 resize-none"
                />
              </div>
              <div>
                <label
                  htmlFor="fecha_ini_eleccion"
                  className="block text-sm font-bold text-gray-800"
                >
                  Fecha Inicio <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  type="date"
                  name="fecha_ini_eleccion"
                  id="fecha_ini_eleccion"
                  defaultValue={selected.fecha_ini_eleccion}
                />
              </div>

              <div>
                <label
                  htmlFor="fecha_fin_eleccion"
                  className="block text-sm font-bold text-gray-800"
                >
                  Fecha De Finalización <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.fecha_fin_eleccion}
                  type="date"
                  name="fecha_fin_eleccion"
                  id="fecha_fin_eleccion"
                />
              </div>

              <div>
                <label
                  htmlFor="hora_ini_eleccion"
                  className="block text-sm font-bold text-gray-800"
                >
                  Hora Inicio <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.hora_ini_eleccion}
                  type="time"
                  name="hora_ini_eleccion"
                  id="hora_ini_eleccion"
                />
              </div>

              <div>
                <label
                  htmlFor="hora_fin_eleccion"
                  className="block text-sm font-bold text-gray-800"
                >
                  Hora De Finalización <span className="text-red-600">*</span>
                </label>
                <InputCustom
                  disabled={!isCheck}
                  defaultValue={selected.hora_fin_eleccion}
                  type="time"
                  name="hora_fin_eleccion"
                  id="hora_fin_eleccion"
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
export default ModalEleccionDetail;
