import { useState } from "react";
import useReporte from "../../hooks/reporte/useReporte";
import { NotificationError } from "../../utilities";
import { IoIosSearch } from "react-icons/io";
import styles from "../../components/ui/ButtonCreate.module.css";
import { FaCheck } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import TableReporte from "./TableReporte";
import TableNoVoto from "./TableNoVoto";
import { ImCancelCircle } from "react-icons/im";
import { useAuthStore } from "../../store/auth.store";
import { ButtonExport } from "../../components";

const ReporteSection = () => {
  const [eleccionId, setEleccionId] = useState(0);
  const [isVotaron, setIsVotaron] = useState("0");
  const [fetchData, setFetchData] = useState(false);
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");
  const {
    votantesTotal,
    votantesActivos,
    candidatos,
    elecciones,
    loadingElec,
    records,
    count,
    offset,
    limit,
    setRecords,
    handlePageChange,
    fetchVotantes,
    downloadVotaronExcel,
    downloadNoVotaronExcel
  } = useReporte(eleccionId, fetchData, isVotaron, profilePayload);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eleccionId == 0) {
      NotificationError("Seleccione una elección");
      return;
    }

    if (profilePayload === "Administrador" && isVotaron === "0") {
      NotificationError("Seleccione si votaron o no");
      return;
    }

    setFetchData(true);
    fetchVotantes();
  };

  return (
    <>
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <label htmlFor="areaId" className="block text-sm font-bold text-gray-800 mb-2">
            Elección <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-x-2">
            <select
              value={eleccionId}
              id="areaId"
              name="areaId"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              onChange={(e) => setEleccionId(e.target.value)}
            >
              <option value="0">Seleccione la elección</option>
              {loadingElec ? (
                <option value="0">Cargando Elecciones</option>
              ) : elecciones.length > 0 ? (
                elecciones.map((eleccion) => (
                  <option key={eleccion.id_eleccion} value={eleccion.id_eleccion}>
                    {eleccion.nombre_eleccion}
                  </option>
                ))
              ) : (
                <option value="0">No hay elecciones</option>
              )}
            </select>
          </div>
          {profilePayload === "Administrador" && (
            <>
              <label
                htmlFor="isVotaron"
                className="block text-sm font-bold text-gray-800 mb-2 mt-6"
              >
                Votantes <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-x-2">
                <select
                  value={isVotaron}
                  id="isVotaron"
                  name="isVotaron"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  onChange={(e) => {
                    setRecords([]);
                    setIsVotaron(e.target.value);
                  }}
                >
                  <option value="0">Seleccione la opción</option>
                  <option value="si">Si Votarón</option>
                  <option value="no">No Votarón</option>
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end mt-4">
            <button title="Consultar" type="submit" className={styles.boton3}>
              <IoIosSearch className="w-6" />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 w-full">
        <div className="flex justify-between items-center border shadow-md py-6 px-8 rounded-md">
          <HiMiniUsers className="w-12 text-colorSecundary/80" />
          <div>
            <p className="text-colorText/80 font-bold">Base votantes</p>
            <p className="text-colorText/80 flex justify-end text-3xl font-semibold">
              {votantesTotal ?? 0}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center border shadow-md py-6 px-8 rounded-md">
          <FaCheck className="w-12 text-blue-500/80" />
          <div>
            <p className="text-colorText/80 font-bold">Votaron</p>
            <p className="text-colorText/80 flex justify-end text-3xl font-semibold">
              {votantesActivos ?? 0}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center border shadow-md py-6 px-8 rounded-md">
          <ImCancelCircle className="w-12 text-colorSecundary/80" />
          <div>
            <p className="text-colorText/80 font-bold">No votaron</p>
            <p className="text-colorText/80 flex justify-end text-3xl font-semibold">
              {Number(votantesTotal) - Number(votantesActivos)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 w-full">
        {candidatos.length > 0
          ? candidatos.map((c) => (
              <div
                key={c.candidato_id}
                className="flex justify-between items-center border shadow-md py-6 px-8 rounded-md"
              >
                <div>
                  <p className="text-colorText font-bold">Candidato</p>
                  <p className="text-colorText/80 flex justify-end font-semibold ">
                    {c.nombre_candidato}
                  </p>
                </div>
                <div>
                  <p className="text-colorText font-bold">Votos</p>
                  <p className="text-colorText/80 flex justify-end text-3xl font-semibold">
                    {c.votos_obtenidos}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
      {profilePayload === "Administrador" &&
        records.length > 0 &&
        (isVotaron === "si" ? (
          <>
            <div className="flex justify-end ">
              <ButtonExport downloadExcel={downloadVotaronExcel} />
            </div>
            <TableReporte
              records={records}
              handlePageChange={handlePageChange}
              count={count}
              offset={offset}
              limit={limit}
            />
          </>
        ) : isVotaron === "no" ? (
          <>
            <div className="flex justify-end ">
              <ButtonExport downloadExcel={downloadNoVotaronExcel} />
            </div>
            <TableNoVoto
              records={records}
              handlePageChange={handlePageChange}
              count={count}
              offset={offset}
              limit={limit}
            />
          </>
        ) : null)}
    </>
  );
};
export default ReporteSection;
