import { FaEye } from "react-icons/fa";
import { Pagination, Toggle } from "../../components";
import { formatTime } from "../../utilities";
import { useAuthStore } from "../../store/auth.store";
import { format, parseISO } from "date-fns";

const TableEleccionSection = ({
  records,
  setSelected,
  setModalOpen,
  handlePageChange,
  handleToggleChange,
  count,
  offset,
  limit
}) => {
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");
  return (
    <div className="min-h-[60vh] h-auto pb-12 relative ">
      <div className="flex justify-center">
        <table className="w-full rounded-md border border-collapse table-fixed max-md:border-0 max-md:last:border-b-0 font-Montserrat">
          <thead className="max-md:hidden">
            <tr className=" max-md:mb-2 max-md:border-b-4 max-md:block ">
              <th className="lg:w-[5%] text-[12px] py-3 text-center capitalize">No.</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Elección</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Descripción</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Fecha Inicial</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Fecha Final</th>
              <th className="lg:w-[14%] text-[12px] py-3 text-center uppercase">Hora Inicial</th>
              <th className="lg:w-[14%] text-[12px] py-3 text-center uppercase">Hora Final</th>
              {profilePayload === "Administrador" && (
                <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Estado</th>
              )}
              <th className="lg:w-[12%] text-[12px] py-3 text-center uppercase">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {records.map((eleccion) => (
              <tr
                key={eleccion.id_eleccion}
                className=" border border-gray-300 hover:bg-[#e6e3e3] even:bg-[#f2f2f2] "
              >
                <td
                  data-label="No."
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {eleccion.id_eleccion}
                </td>
                <td
                  data-label="NoElecciónmbre"
                  className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {eleccion.nombre_eleccion}
                </td>
                <td
                  data-label="Descripción"
                  className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {eleccion.descripcion_eleccion}
                </td>
                <td
                  data-label="Fecha Inicial"
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {format(parseISO(eleccion.fecha_ini_eleccion), "dd/MM/yyyy")}
                </td>
                <td
                  data-label="Fecha Final"
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
                  data-label="Hora Final"
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {formatTime(eleccion.hora_fin_eleccion)}
                </td>
                {profilePayload === "Administrador" && (
                  <td
                    data-label="Estado"
                    className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <Toggle
                      state={eleccion.estado_id}
                      id={eleccion.id_eleccion}
                      handleToggleChange={handleToggleChange}
                    />
                  </td>
                )}
                <td
                  data-label="Opciones"
                  className="flex justify-center items-center gap-2 text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right"
                >
                  <button
                    onClick={() => {
                      setSelected(eleccion);
                      setModalOpen(true);
                    }}
                    className="p-2 rounded-md border border-color757575 hover:bg-colorPrimary/30"
                  >
                    <FaEye className="text-color757575" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination handlePageChange={handlePageChange} count={count} offset={offset} limit={limit} />
    </div>
  );
};
export default TableEleccionSection;
