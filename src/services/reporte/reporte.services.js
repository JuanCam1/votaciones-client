import { instance } from "../../utilities";

export const pudieronVotar = async (id_eleccion) => {
  return await instance.get(`reportes/pudieronVotar/${id_eleccion}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const votaronCount = async (id_eleccion) => {
  return await instance.get(`reportes/votaronCount/${id_eleccion}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export const candidatosVotos = async (id_eleccion) => {
  return await instance.get(`reportes/candidatosVotos/${id_eleccion}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getVotaronAll = async (limit, offset, id_eleccion) => {
  const payload = { limit, offset, id_eleccion };

  return await instance.post("/reportes/getVotaronAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getNoVotaronAll = async (limit, offset, id_eleccion) => {
  const payload = { limit, offset, id_eleccion };

  return await instance.post("/reportes/getNoVotaronAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getDownloadVotaronExcel = async (id_eleccion) => {
  return await instance.get(`/reportes/getDownloadExcelVotaron/${id_eleccion}`, {
    responseType: "blob"
  });
};

export const getDownloadNoVOtaronExcel = async (id_eleccion) => {
  return await instance.get(`/reportes/getDownloadExcelNoVotaron/${id_eleccion}`, {
    responseType: "blob"
  });
};
