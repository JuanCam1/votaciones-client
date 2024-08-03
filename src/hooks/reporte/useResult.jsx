import { useEffect, useState } from "react";
import { candidatosVotos, pudieronVotar, votaronCount } from "../../services";
import { NotificationError } from "../../utilities";

const useResult = (id_eleccion) => {
  const [votantesTotal, setVotantesTotal] = useState(0);
  const [votantesActivos, setVotantesActivos] = useState(0);
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await pudieronVotar(id_eleccion);
        const { data: dataActivos } = await votaronCount(id_eleccion);
        const { data: dataCandidatos } = await candidatosVotos(id_eleccion);
        setVotantesTotal(data.data);
        setVotantesActivos(dataActivos.data);
        setCandidatos(dataCandidatos.data);
      } catch (error) {
        NotificationError("Error al cargar las elecciones");
      }
    };
    fetchData();
  }, [id_eleccion]);

  return {
    votantesTotal,
    votantesActivos,
    candidatos
  };
};
export default useResult;
