/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  candidatosVotos,
  getDownloadNoVOtaronExcel,
  getDownloadVotaronExcel,
  getEleccionState,
  getNoVotaronAll,
  getVotaronAll,
  pudieronVotar,
  votaronCount
} from "../../services";
import { NotificationError, NotificationWarning } from "../../utilities";

const useReporte = (id_eleccion, fetchData, isVotaron, profilePayload) => {
  const [elecciones, setElecciones] = useState([]);
  const [loadingElec, setLoadingElec] = useState(false);
  const [votantesTotal, setVotantesTotal] = useState(0);
  const [votantesActivos, setVotantesActivos] = useState(0);

  const [candidatos, setCandidatos] = useState([]);
  const [loadingVotantes, setLoadingVotantes] = useState(false);
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoadingElec(true);
      try {
        const { data } = await getEleccionState("Inactivo");
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
    setLoadingVotantes(true);
    try {
      const { data } = await pudieronVotar(id_eleccion);
      const { data: dataActivos } = await votaronCount(id_eleccion);
      const { data: dataCandidatos } = await candidatosVotos(id_eleccion);
      setVotantesTotal(data.data);
      setVotantesActivos(dataActivos.data);
      setCandidatos(dataCandidatos.data);

      if (profilePayload === "Administrador") {
        if (isVotaron === "si") {
          const { data: dataVotaron } = await getVotaronAll(limit, offset, id_eleccion);
          setRecords(dataVotaron.data.votantes);
          setCount(dataVotaron.data.count);
          return
        }

        if (isVotaron === "no") {
          const { data: dataNoVotaron } = await getNoVotaronAll(limit, offset, id_eleccion);
          setRecords(dataNoVotaron.data.votantes);
          setCount(dataNoVotaron.data.count);
          return
        }
      }
    } catch (error) {
      if (error.response.data.error.message === "Is empty") {
        NotificationWarning("No hay votantes");
        setRecords([]);
      } else {
        NotificationError("Error al cargar las votantes");
      }
    } finally {
      setLoadingVotantes(false);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchVotantes();
    }
  }, [fetchData]);

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

  const downloadVotaronExcel = async (e) => {
    e.preventDefault();
    try {
      const response = await getDownloadVotaronExcel(id_eleccion);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Votaron.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      NotificationError("No se ha podido descargar");
    }
  };
 
  const downloadNoVotaronExcel = async (e) => {
    e.preventDefault();
    try {
      const response = await getDownloadNoVOtaronExcel(id_eleccion);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "NoVotaron.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      NotificationError("No se ha podido descargar");
    }
  };

  return {
    votantesTotal,
    votantesActivos,
    candidatos,
    elecciones,
    loadingElec,
    records,
    loadingVotantes,
    count,
    offset,
    limit,
    setRecords,
    fetchVotantes,
    handlePageChange,
    downloadVotaronExcel,
    downloadNoVotaronExcel
  };
};
export default useReporte;
