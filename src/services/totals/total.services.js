import { instance } from "../../utilities";

export const getStadoTotal = async () => {
  return await instance.get(`/estado/getEstadoState`);
};

export const getRolesTotal = async () => {
  return await instance.get(`/role/getRoleState`);
};
