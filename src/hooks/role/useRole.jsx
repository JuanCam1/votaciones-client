import { useEffect, useState } from "react";
import { getRolesTotal } from "../../services";
import { NotificationError } from "../../utilities";

const useRole = () => {
  const [roles, setRoles] = useState([]);
  const [loadingRole, setLoadingRole] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingRole(true);
      try {
        const { data } = await getRolesTotal();
        setRoles(data.data);
      } catch (error) {
        NotificationError("Error al cargar los perfiles");
      } finally {
        setLoadingRole(false);
      }
    };
    fetchData();
  }, []);
  return {
    roles,
    loadingRole
  };
};
export default useRole;
