import { IoIosSearch } from "react-icons/io";
import { Loading } from "../../components";
import useEleccionCandidato from "../../hooks/eleccion-candidato/useEleccionCandidato";
import { useState } from "react";
import { NotificationError } from "../../utilities";
import styles from "../../components/ui/ButtonCreate.module.css";
import TableCandidatoByEleccion from "./TableCandidatoByEleccion";

const AddCandidatoSection = () => {
  const [eleccionId, setEleccionId] = useState(0);
  const [fetchData, setFetchData] = useState(false);

  const { elecciones, loadingElec, records, loading, fetchVotantes, handleToggleChange } =
    useEleccionCandidato(eleccionId, fetchData);

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
            Elecciones <span className="text-red-600">*</span>
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
        <TableCandidatoByEleccion records={records} handleToggleChange={handleToggleChange} />
      </div>
    </>
  );
};
export default AddCandidatoSection;
