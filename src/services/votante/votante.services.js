import { instance } from "../../utilities";

export const getVotanteAll = async (limit, offset, filter) => {
  const payload = { limit, offset };

  if (filter) {
    payload.filter = filter;
  }
  return await instance.post("/votante/getVotanteAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const createVotante = async (votante) => {
  return await instance.post("/votante/createVotante", votante, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const updateVotante = async (votante) => {
  return await instance.patch(`/votante/updateVotante/${votante.id_votante}`, votante, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const changeStateVotante = async (id_votante) => {
  return await instance.get(`/votante/changeStateVotante/${id_votante}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getCandidatoById = async (id_votante) => {
  return await instance.get(`/votante/getVotanteById/${id_votante}`);
};

export const getDownloadExcelVotante = async (state) => {
  return await instance.get(`/votante/getDownloadExcel/${state}`, {
    responseType: "blob"
  });
};
