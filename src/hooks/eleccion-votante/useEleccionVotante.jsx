/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NotificationError, NotificationWarning } from "../../utilities";
import {
  changeStateEleccionVotante,
  downloadExcelEleccionVotante,
  getEleccionState,
  getEleccionVotanteByIdEleccionAll
} from "../../services";

const useEleccionVotante = (id_eleccion, fetchData) => {
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [elecciones, setElecciones] = useState([]);
  const [loadingElec, setLoadingElec] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10;

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
      const { data } = await getEleccionVotanteByIdEleccionAll(limit, offset, id_eleccion);
      setRecords(data.data.eleccionesVotantes);
      setCount(data.data.count);
    } catch (error) {
      if (error.response.data.error.message === "Is empty") {
        NotificationWarning("No hay votantes");
        setRecords([]);
      } else {
        NotificationError("Error al cargar las votantes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchVotantes();
    }
  }, [offset, fetchData]);

  const handlePageChange = (operation) => {
    switch (operation) {
      case "next":
        if (offset + limit < count) {
          setOffset(offset + limit);
        }
        break;
      case "prev":
        if (offset > 0) {
          setOffset(offset - limit);
        }
        break;
    }
  };

  // Cambiar dependendiendo de la eleccion
  const downloadExcel = async (e, id_eleccion) => {
    e.preventDefault();
    try {
      const response = await downloadExcelEleccionVotante(id_eleccion);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Votantes.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      NotificationError("No se ha podido descargar");
    }
  };

  const handleToggleChange = async (id) => {
    return await changeStateEleccionVotante(id);
  };

  return {
    elecciones,
    loadingElec,
    records,
    loading,
    count,
    offset,
    limit,
    fetchVotantes,
    handlePageChange,
    downloadExcel,
    handleToggleChange
  };
};
export default useEleccionVotante;
