import { instance } from "../../utilities";

export const createEleccion = async (eleccion) => {
  return await instance.post("eleccion/createEleccion", eleccion, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const updateEleccion = async (eleccion) => {

  return await instance.patch(`eleccion/updateEleccion/${eleccion.id_eleccion}`, eleccion, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getEleccionState = async (state) => {

  return await instance.get(`eleccion/getEleccionState/${state}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getEleccionAll = async (limit, offset, filter) => {
  const payload = { limit, offset };

  if (filter) {
    payload.filter = filter;
  }

  return await instance.post("/eleccion/getEleccionAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const changeStateEleccion = async (idEleccion) => {
  return await instance.get(`/eleccion/changeStateEleccion/${idEleccion}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getDownloadExcelEleccion = async (state) => {
  return await instance.get(`/eleccion/getDownloadExcelEleccion/${state}`, {
    responseType: "blob"
  });
};
