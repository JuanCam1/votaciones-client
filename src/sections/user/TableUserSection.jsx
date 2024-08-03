import { Pagination, Toggle } from "../../components";
import userImage from "../../assets/statics/no-user.webp";
import { FaEye } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { instance, NotificationError } from "../../utilities";
import { useAuthStore } from "../../store/auth.store";

const TableUserSection = ({
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
  const pathUrl = import.meta.env.VITE_API_URL + "/usuario/getImage/";
  const [usuarioImages, setUsuarioImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const usuario of records) {
        if (usuario.foto_usuario !== "sinphoto.jpg") {
          try {
            const { data } = await instance.get(pathUrl + usuario.foto_usuario, {
              responseType: "blob"
            });
            images[usuario.id_usuario] = URL.createObjectURL(data);
          } catch (error) {
            NotificationError("Error al cargar las fotos");
          }
        }
      }
      setUsuarioImages(images);
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
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppeercase">cédula.</th>
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Foto</th>
              <th className="lg:w-[20%] text-[12px] py-3 text-center uppercase">Nombre</th>
              <th className="lg:w-[20%] text-[12px] py-3 text-center uppercase">Correo</th>
              <th className="lg:w-[15%] text-[12px] py-3 text-center uppercase">perfil</th>
              {profilePayload === "Administrador" && (
                <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Estado</th>
              )}
              <th className="lg:w-[10%] text-[12px] py-3 text-center uppercase">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {records.map((usuario) => (
              <tr
                key={usuario.id_usuario}
                className=" border border-gray-300 hover:bg-[#e6e3e3] even:bg-[#f2f2f2] "
              >
                <td
                  data-label="No."
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {usuario.id_usuario}
                </td>
                <td
                  data-label="Cédula"
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {usuario.cedula_usuario}
                </td>
                <td
                  data-label="Foto"
                  className="flex justify-center text-sm p-2 max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  <div className="border w-[30px] h-[30px] overflow-hidden rounded-full">
                    {usuarioImages[usuario.id_usuario] ? (
                      <img
                        className="object-cover"
                        src={usuarioImages[usuario.id_usuario]}
                        alt={`Foto usuario ${usuario.nombre_usuario}`}
                      />
                    ) : (
                      <img
                        src={userImage}
                        alt={`Foto usuario ${usuario.nombre_usuario}`}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </td>
                <td
                  data-label="Nombre"
                  className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {`${usuario.nombre_usuario} ${usuario.lastname_usuario}`}
                </td>
                <td
                  data-label="Correo"
                  className=" text-sm p-2 text-left  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {usuario.correo_usuario}
                </td>
                <td
                  data-label="Perfil"
                  className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {usuario.nombre_role}
                </td>
                {profilePayload === "Administrador" && (
                  <td
                    data-label="Estado"
                    className=" text-sm p-2 text-center  max-md:text-[12px] max-md:border-b-[1px] max-md:block max-md:text-right whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <Toggle
                      state={usuario.estado_id}
                      id={usuario.id_usuario}
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
                        id_usuario: usuario.id_usuario,
                        cedula_usuario: usuario.cedula_usuario,
                        nombre_usuario: usuario.nombre_usuario,
                        lastname_usuario: usuario.lastname_usuario,
                        correo_usuario: usuario.correo_usuario,
                        foto_usuario: null,
                        photoUrl: usuarioImages[usuario.id_usuario] ?? usuario.foto_usuario,
                        role_id: usuario.role_id
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
export default TableUserSection;
