import { Toggle } from "../../components";
import { useAuthStore } from "../../store/auth.store";

const TableCandidatoByEleccion = ({ records, handleToggleChange }) => {
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");
  return (
    <div className="min-h-[60vh] h-auto pb-12 relative ">
      <div className="flex justify-start">
        <table className="w-[70%] rounded-md border border-collapse table-fixed max-md:border-0 max-md:last:border-b-0 font-Montserrat">
          <thead className="max-md:hidden">
            <tr className=" max-md:mb-2 max-md:border-b-4 max-md:block ">
              <th className="lg:w-[5%] text-[12px] py-3 text-center capitalize">No.</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Cédula</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Nombre</th>
              {profilePayload === "Administrador" && (
                <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Estado</th>
              )}
            </tr>
          </thead>
          <tbody>
            {records.map((candidato) => (
              <tr
                key={candidato.id_eleccion_candidato}
                className=" border border-gray-300 hover:bg-[#e6e3e3] even:bg-[#f2f2f2] "
              >
                <td
                  data-label="No."
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {candidato.id_eleccion_candidato}
                </td>
                <td
                  data-label="Cedula"
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {candidato.cedula_candidato}
                </td>

                <td
                  data-label="Nombre"
                  className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {candidato.nombre_candidato}
                </td>
                {profilePayload === "Administrador" && (
                  <td
                    data-label="Estado"
                    className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <Toggle
                      state={candidato.estado_id}
                      id={candidato.id_eleccion_candidato}
                      handleToggleChange={handleToggleChange}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TableCandidatoByEleccion;
