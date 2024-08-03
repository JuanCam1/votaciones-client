import { useEffect, useState } from "react";
import { getStadoTotal } from "../../services";
import { NotificationError } from "../../utilities";

const useEstado = () => {
  const [estados, setEstados] = useState([]);
  const [loadingEstado, setLoadingEstado] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingEstado(true);
      try {
        const { data } = await getStadoTotal();
        setEstados(data.data);
      } catch (error) {
        NotificationError("Error al cargar los estados");
      } finally {
        setLoadingEstado(false);
      }
    };
    fetchData();
  }, []);
  return {
    estados,
    loadingEstado
  };
};
export default useEstado;
