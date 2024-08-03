import { useUpdateCandidato } from "../../hooks";
import { useAuthStore } from "../../store/auth.store";
import ButtonCustom from "../ui/ButtonCustom";
import Checkbox from "../ui/Checkbox";
import InputCustom from "../ui/InputCustom";
import Modal from "../ui/Modal";

const ModalCandidatoDetail = ({ selected, isOpen, onClose, setIsEdit }) => {
  if (Object.values(selected).includes("") || Object.values(selected).includes(undefined)) {
    onClose();
  }

  const {
    handleChangeImage,
    handleChange,
    handleSubmit,
    changeEdit,
    photoPreview,
    isCheck,
    candidato
  } = useUpdateCandidato(selected, setIsEdit, onClose);
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");
  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={"Candidato"}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="cedula_candidato" className="block text-sm font-bold text-gray-800">
                  Cedula
                </label>
                <InputCustom
                  disabled={!isCheck}
                  value={candidato.cedula_candidato}
                  onChange={handleChange}
                  name="cedula_candidato"
                  id="cedula_candidato"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="nombre_candidato" className="block text-sm font-bold text-gray-800">
                  Nombre
                </label>
                <InputCustom
                  disabled={!isCheck}
                  value={candidato.nombre_candidato}
                  onChange={handleChange}
                  name="nombre_candidato"
                  id="nombre_candidato"
                />
              </div>

              <div>
                <label htmlFor="foto_candidato" className="block text-sm font-bold text-gray-800">
                  Foto de perfil
                </label>
                <input
                  id="foto_candidato"
                  name="foto_candidato"
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
                text="Actualizar"
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
export default ModalCandidatoDetail;
