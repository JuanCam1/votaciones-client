/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NotificationError, NotificationWarning } from "../../utilities";
import {
  getEleccionState,
  changeStateEleccionCandidato,
  getEleccionCandidatoByIdEleccionAll
} from "../../services";

const useEleccionCandidato = (id_eleccion, fetchData) => {
  const [records, setRecords] = useState([]);
  const [elecciones, setElecciones] = useState([]);
  const [loadingElec, setLoadingElec] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingElec(true);
      try {
        const { data } = await getEleccionState("Todos");
        setElecciones(data.data);
      } catch (error) {
        NotificationError("Error al cargar las elecciones");
      } finally {
        setLoadingElec(false);
      }
    };
    fetchData();
  }, []);

  const fetchVotantes = async () => {
    setLoading(true);
    try {
      const { data } = await getEleccionCandidatoByIdEleccionAll(id_eleccion, "Todos");
      if (data.data.length > 0) {
        setRecords(data.data);
        return;
      } else {
        NotificationWarning("Sin candidatos");
        setRecords([]);
        return;
      }
    } catch (error) {
      if (error.response.data.error.message === "Is empty") {
        NotificationError("No hay candidatos");
        setRecords([]);
        return;
      } else {
        NotificationError("Error al cargar las candidatos");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchVotantes();
    }
  }, [fetchData]);

  const handleToggleChange = async (id) => {
    return await changeStateEleccionCandidato(id);
  };

  return {
    elecciones,
    loadingElec,
    records,
    loading,
    fetchVotantes,
    handleToggleChange
  };
};
export default useEleccionCandidato;
