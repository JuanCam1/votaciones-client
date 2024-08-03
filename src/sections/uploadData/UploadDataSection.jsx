import { MdFileDownload } from "react-icons/md";
import { Loading } from "../../components";
import TableVotanteByEleccion from "./TableVotanteByEleccion";
import { useState } from "react";
import { useEleccionVotante } from "../../hooks";
import { IoIosSearch } from "react-icons/io";
import styles from "../../components/ui/ButtonCreate.module.css";
import { NotificationError } from "../../utilities";

const UploadDataSection = () => {
  const [eleccionId, setEleccionId] = useState(0);
  const [fetchData, setFetchData] = useState(false);
  
  const {
    elecciones,
    loadingElec,
    records,
    loading,
    count,
    offset,
    limit,
    handlePageChange,
    downloadExcel,
    fetchVotantes,
    handleToggleChange
  } = useEleccionVotante(eleccionId, fetchData);

  if (loading && fetchData) return <Loading />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eleccionId == 0) {
      NotificationError("Seleccione una elección");
      return;
    } else {
      setFetchData(true);
      fetchVotantes();
    }
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
            <button title="Consultar" type="submit" className={styles.boton3}>
              <IoIosSearch className="w-6" />
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8">
        <div className="flex justify-end ">
          <button onClick={(e) => downloadExcel(e, eleccionId)} className={styles.boton3}>
            <MdFileDownload />
            <span>Exportar</span>
          </button>
        </div>

        <TableVotanteByEleccion
          records={records}
          handlePageChange={handlePageChange}
          count={count}
          offset={offset}
          limit={limit}
          handleToggleChange={handleToggleChange}
        />
      </div>
    </>
  );
};
export default UploadDataSection;
