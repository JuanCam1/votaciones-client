import { FaEye } from "react-icons/fa6";
import { Pagination } from "../../components";

const TableVotanteSection = ({
  records,
  setSelected,
  setModalOpen,
  handlePageChange,
  count,
  offset,
  limit
}) => {
  return (
    <div className="min-h-[60vh] h-auto pb-12 relative ">
      <div className="flex justify-center">
        <table className="w-full rounded-md border border-collapse table-fixed max-md:border-0 max-md:last:border-b-0 font-Montserrat">
          <thead className="max-md:hidden">
            <tr className=" max-md:mb-2 max-md:border-b-4 max-md:block ">
              <th className="lg:w-[5%] text-[12px] py-3 text-center capitalize">No.</th>
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Cédula</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Nombre</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Correo</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Telefono</th>
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Municipio</th>
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Detalle</th>
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
                      data-label="Cedula"
                      className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.cedula_votante}
                    </td>

                    <td
                      data-label="Nombre"
                      className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {`${votante.primer_nombre_votante} ${votante.segundo_nombre_votante ?? ""} ${votante.primer_apellido_votante} ${votante.segundo_apellido_votante ?? ""}`}
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

                    <td
                      data-label="Municipio"
                      className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {votante.nombre_municipio_votante}
                    </td>

                    <td
                      data-label="Opciones"
                      className="flex justify-center items-center text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right"
                    >
                      <button
                        onClick={() => {
                          setSelected(votante);
                          setModalOpen(true);
                        }}
                        className="p-2 rounded-md border border-color757575 hover:bg-colorPrimary/30"
                      >
                        <FaEye className="text-color757575" />
                      </button>
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
export default TableVotanteSection;
