import { format, parseISO } from "date-fns";
import { Pagination } from "../../components";
import { formatTime } from "../../utilities";

const TableReporte = ({ records, handlePageChange, count, offset, limit }) => {
  return (
    <div className="min-h-[60vh] h-auto pb-12 relative">
      <div className="flex flex-col justify-center">
        <div className="mb-4 flex justify-center">
        </div>
        <table className="w-full rounded-md border border-collapse table-fixed max-md:border-0 max-md:last:border-b-0 font-Montserrat">
          <thead className="max-md:hidden">
            <tr className=" max-md:mb-2 max-md:border-b-4 max-md:block ">
              <th className="lg:w-[5%] text-[12px] py-3 text-center capitalize">No.</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Nombre</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Correo</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Telefono</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Dirección IP</th>
              <th className="lg:w-[20%] text-[12px] py-3 text-center uppercase">Fecha Voto</th>
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Hora Voto</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0
              ? records.map((votante) => (
                  <tr
                    key={votante.votante_id}
                    className=" border border-gray-300 hover:bg-[#e6e3e3] even:bg-[#f2f2f2] "
                  >
                    <td
                      data-label="No"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.votante_id}
                    </td>
                    <td
                      data-label="Nombre"
                      className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.nombre_completo}
                    </td>

                    <td
                      data-label="Correo"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.correo_corporativo_votante}
                    </td>
                    <td
                      data-label="Telefono"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.telefono_votante}
                    </td>
                    <td
                      data-label="Dirección IP"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.dir_ip}
                    </td>
                    <td
                      data-label="Fecha Voto"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {format(parseISO(votante.fecha_voto), "dd/MM/yyyy")}
                    </td>
                    <td
                      data-label="Telefono"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {formatTime(votante.hora_voto)}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <Pagination handlePageChange={handlePageChange} count={count} offset={offset} limit={limit} />
    </div>
  );
};
export default TableReporte;
