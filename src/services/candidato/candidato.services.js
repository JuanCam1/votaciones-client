import { instance } from "../../utilities";

export const getCandidatoAll = async (limit, offset, filter) => {
  const payload = { limit, offset };

  if (filter) {
    payload.filter = filter;
  }
  return await instance.post("/candidato/getCandidatoAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const createCandidato = async (candidato) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(candidato)) {
    formData.append(key, value);
  }

  return await instance.post("/candidato/createCandidato", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const updateCandidato = async (candidato) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(candidato)) {
    formData.append(key, value);
  }

  return await instance.patch(`/candidato/updateCandidato/${candidato.id_candidato}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const changeStateCandidato = async (id_candidato) => {
  return await instance.get(`/candidato/changeStateCandidato/${id_candidato}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getCandidatoById = async (id_candidato) => {
  return await instance.get(`/candidato/getCandidatoById/${id_candidato}`);
};

export const getCandidatosByState = async (state) => {
  return await instance.get(`/candidato/getCandidatoAllState/${state}`);
};

export const downloadExcelCandidato = async (state) => {
  return await instance.get(`/candidato/getDownloadExcelCandidato/${state}`, {
    responseType: "blob"
  });
};
