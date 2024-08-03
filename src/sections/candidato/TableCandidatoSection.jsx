import { FaEye } from "react-icons/fa6";
import { Pagination, Toggle } from "../../components";
import userImage from "../../assets/statics/no-user.webp";
import { useEffect, useState } from "react";
import { instance, NotificationError } from "../../utilities";
import { useAuthStore } from "../../store/auth.store";

const TableCandidatoSection = ({
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
  const pathUrl = import.meta.env.VITE_API_URL + "/candidato/getImage/";
  const [candidatoImages, setCandidatoImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const candidato of records) {
        if (candidato.foto_candidato !== "sinphoto.jpg") {
          try {
            const { data } = await instance.get(pathUrl + candidato.foto_candidato, {
              responseType: "blob"
            });
            images[candidato.id_candidato] = URL.createObjectURL(data);
          } catch (error) {
            NotificationError("Error al cargar las fotos");
          }
        }
      }
      setCandidatoImages(images);
    };
    fetchImages();
  }, [pathUrl, records]);

  return (
    <div className="min-h-[60vh] h-auto pb-12 relative ">
      <div className="flex justify-center">
        <table className="w-full rounded-md border border-collapse table-fixed max-md:border-0 max-md:last:border-b-0 font-Montserrat">
          <thead className="max-md:hidden">
            <tr className=" max-md:mb-2 max-md:border-b-4 max-md:block ">
              <th className="lg:w-[5%] text-[12px] py-3 text-center capitalize">No.</th>
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Foto</th>
              <th className="lg:w-[25%] text-[12px] py-3 text-center uppercase">Nombre</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">Cédula</th>
              {profilePayload === "Administrador" && (
                <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Estado</th>
              )}
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {records.map((candidato) => (
              <tr
                key={candidato.id_candidato}
                className=" border border-gray-300 hover:bg-[#e6e3e3] even:bg-[#f2f2f2] "
              >
                <td
                  data-label="Cedula"
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {candidato.id_candidato}
                </td>
                <td
                  data-label="Foto"
                  className="flex justify-center text-sm p-2 max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  <div className="border w-[30px] h-[30px] overflow-hidden rounded-full">
                    {candidatoImages[candidato.id_candidato] ? (
                      <img
                        className="object-cover"
                        src={candidatoImages[candidato.id_candidato]}
                        alt={`Foto usuario ${candidato.nombre_candidato}`}
                      />
                    ) : (
                      <img
                        src={userImage}
                        alt={`Foto usuario ${candidato.nombre_candidato}`}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </td>
                <td
                  data-label="Nombre"
                  className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {candidato.nombre_candidato}
                </td>
                <td
                  data-label="Cedula"
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {candidato.cedula_candidato}
                </td>
                {profilePayload === "Administrador" && (
                  <td
                    data-label="Estado"
                    className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <Toggle
                      state={candidato.estado_id}
                      id={candidato.id_candidato}
                      handleToggleChange={handleToggleChange}
                    />
                  </td>
                )}
                <td
                  data-label="Opciones"
                  className="flex justify-center items-center text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right"
                >
                  <button
                    onClick={() => {
                      setSelected({
                        id_candidato: candidato.id_candidato,
                        nombre_candidato: candidato.nombre_candidato,
                        cedula_candidato: candidato.cedula_candidato,
                        foto_candidato: null,
                        photoUrl:
                          candidatoImages[candidato.id_candidato] ?? candidato.foto_candidato
                      });
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
export default TableCandidatoSection;
