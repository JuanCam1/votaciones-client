import { Pagination } from "../../components";

const TableNoVoto = ({ records, handlePageChange, count, offset, limit }) => {
  return (
    <div className="min-h-[60vh] h-auto pb-12 relative">
      <div className="flex flex-col justify-center">
        <div className="mb-4 flex justify-center">
        </div>
        <table className="w-full rounded-md border border-collapse table-fixed max-md:border-0 max-md:last:border-b-0 font-Montserrat">
          <thead className="max-md:hidden">
            <tr className=" max-md:mb-2 max-md:border-b-4 max-md:block ">
              <th className="lg:w-[10%] text-[12px] py-3 text-center capitalize">No.</th>
              <th className="lg:w-[35%] text-[12px] py-3 text-center uppercase">Nombre</th>
              <th className="lg:w-[35%] text-[12px] py-3 text-center uppercase">Correo</th>
              <th className="lg:w-[20%] text-[12px] py-3 text-center uppercase">Telefono</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0
              ? records.map((votante) => (
                  <tr
                    key={votante.id_votante}
                    className=" border border-gray-300 hover:bg-[#e6e3e3] even:bg-[#f2f2f2] "
                  >
                    <td
                      data-label="No"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.id_votante}
                    </td>
                    <td
                      data-label="Nombre"
                      className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.nombre_completo}
                    </td>

                    <td
                      data-label="Correo"
                      className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.correo_corporativo_votante}
                    </td>
                    <td
                      data-label="Telefono"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.telefono_votante}
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
export default TableNoVoto;
