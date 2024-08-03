import { GiVote } from "react-icons/gi";
import { formatTime } from "../../utilities";
import { format, parseISO } from "date-fns";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useState } from "react";
import { ModalResult, ModalVote } from "../../components";

const TablaEleccionVotacion = ({ handleReset, setIsValidate, idVotante, isValidate }) => {
  const [isModalVote, setIsModalVote] = useState(false);
  const [isModalResult, setIsModalResult] = useState(false);
  const [selected, setSelected] = useState({});

  const handleCloseModalVote = () => {
    setIsModalVote(false);
  };

  const handleCloseModalResult = () => {
    setIsModalResult(false);
  };
  return (
    <div className="flex justify-center pt-4">
      <table className="w-full rounded-md border border-collapse table-fixed max-md:border-0 max-md:last:border-b-0 font-Montserrat">
        <thead className="max-md:hidden">
          <tr className=" max-md:mb-2 max-md:border-b-4 max-md:block ">
            <th className="lg:w-[5%] text-[12px] py-3 text-center capitalize">No.</th>
            <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Elección</th>
            <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Fecha Inicial</th>
            <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Fecha Final</th>
            <th className="lg:w-[14%] text-[12px] py-3 text-center uppercase">Hora Inicial</th>
            <th className="lg:w-[14%] text-[12px] py-3 text-center uppercase">Hora Final</th>

            <th className="lg:w-[12%] text-[12px] py-3 text-center uppercase">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {isValidate.map((eleccion) => (
            <tr
              key={eleccion.eleccion_id}
              className=" border border-gray-300 hover:bg-[#e6e3e3] even:bg-[#f2f2f2] "
            >
              <td
                data-label="No."
                className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {eleccion.eleccion_id}
              </td>
              <td
                data-label="Nombre"
                className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {eleccion.nombre_eleccion}
              </td>
              <td
                data-label="Fecha Inicial"
                className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {format(parseISO(eleccion.fecha_ini_eleccion), "dd/MM/yyyy")}
              </td>
              <td
                data-label="Fecha de Finalización"
                className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {format(parseISO(eleccion.fecha_fin_eleccion), "dd/MM/yyyy")}
              </td>
              <td
                data-label="Hora Inicial"
                className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {formatTime(eleccion.hora_ini_eleccion)}
              </td>
              <td
                data-label="Hora de Finalización"
                className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {formatTime(eleccion.hora_fin_eleccion)}
              </td>

              <td
                data-label="Opciones"
                className="flex justify-center items-center gap-2 text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right"
              >
                {eleccion.nombre_estado === "Activo" ? (
                  <button
                    onClick={() => {
                      setSelected(eleccion);
                      setIsModalVote(true);
                    }}
                    className="p-2 rounded-md border border-color757575 hover:bg-colorPrimary/30"
                    title="Votar"
                  >
                    <GiVote className="text-color757575" />
                  </button>
                ) : null}
                {eleccion.nombre_estado === "Inactivo" &&
                eleccion.estado_eleccion_nombre === "Inactivo" ? (
                  <button
                    onClick={() => {
                      setSelected(eleccion);
                      setIsModalResult(true);
                    }}
                    className="p-2 rounded-md border border-color757575 hover:bg-colorPrimary/30"
                    title="Resultados"
                  >
                    <HiOutlineLightBulb className="text-color757575" />
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalVote && (
        <ModalVote
          handleReset={handleReset}
          selected={selected}
          setIsValidate={setIsValidate}
          idVotante={idVotante}
          isOpen={isModalVote}
          onClose={handleCloseModalVote}
        />
      )}
      {isModalResult && (
        <ModalResult selected={selected} isOpen={isModalResult} onClose={handleCloseModalResult} />
      )}
    </div>
  );
};
export default TablaEleccionVotacion;
