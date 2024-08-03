import { HiMiniUsers } from "react-icons/hi2";
import Modal from "../ui/Modal";
import { useResult } from "../../hooks";
import { FaCheck } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

const ModalResult = ({ selected, isOpen, onClose }) => {
  const { votantesTotal, votantesActivos, candidatos } = useResult(selected.eleccion_id);
  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={"Resultados"}
      mostrarHeader={true}
      mostrarOverlay={true}
      posicionModal={"center"}
      padding={"p-2"}
      heighModal={"h-auto max-md:h-screen"}
      widthModal={"w-auto lg:min-w-[800px] max-md:w-screen"}
    >
      <div className="mt-8 max-md:mt-4 w-full flex flex-wrap gap-x-2 gap-y-2">
        <div className="flex-1 h-[110px] max-md:h-[90px] flex justify-between items-center border shadow-md py-6 max-md:py-2 px-8 max-md:px-4 rounded-md max-md:grid-span-1">
          <HiMiniUsers className="w-12 text-colorSecundary/80 max-md:hidden" />
          <div>
            <p className="text-colorText/80 font-bold max-md:text-sm">Base votantes</p>
            <p className="text-colorText/80 flex justify-end text-3xl font-semibold">
              {votantesTotal ?? 0}
            </p>
          </div>
        </div>

        <div className="flex-1 h-[110px] max-md:h-[90px] flex justify-between items-center border shadow-md py-6 max-md:py-2 px-8 max-md:px-4 rounded-md max-md:grid-span-1">
          <ImCancelCircle className="w-12 text-red-500/80 max-md:hidden" />
          <div>
            <p className="text-colorText/80 font-bold">No votaron</p>
            <p className="text-colorText/80 flex justify-end text-3xl font-semibold">
              {Number(votantesTotal) - Number(votantesActivos)}
            </p>
          </div>
        </div>

        <div className="flex-1 h-[110px] max-md:h-[90px] flex justify-between items-center border shadow-md py-6 max-md:py-2 px-8 max-md:px-4 rounded-md max-md:grid-span-1">
          <FaCheck className="w-12 text-blue-500/80" />
          <div>
            <p className="text-colorText/80 font-bold">Votaron</p>
            <p className="text-colorText/80 flex justify-end text-3xl font-semibold">
              {votantesActivos ?? 0}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 max-md:grid-cols-1 gap-6 w-full">
        {candidatos.length > 0
          ? candidatos.map((c) => (
              <div
                key={c.candidato_id}
                className="flex justify-between items-center border shadow-md py-6 px-8 max-md:px-4 max-md:py-4 rounded-md"
              >
                <div>
                  <p className="text-colorText font-bold">Candidato</p>
                  <p className="text-colorText/80 flex justify-end font-semibold max-md:text-sm">
                    {c.nombre_candidato}
                  </p>
                </div>
                <div>
                  <p className="text-colorText font-bold">Votos</p>
                  <p className="text-colorText/80 flex justify-end text-3xl font-semibold max-md:text-2xl">
                    {c.votos_obtenidos}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </Modal>
  );
};
export default ModalResult;
