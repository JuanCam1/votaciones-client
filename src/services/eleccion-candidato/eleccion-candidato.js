import { instance } from "../../utilities";

export const getEleccionCandidatoAll = async (limit, offset, filter) => {
  const payload = { limit, offset };

  if (filter) {
    payload.filter = filter;
  }
  return await instance.post("/eleccion-candidato/getEleccionCandidatoAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const changeStateEleccionCandidato = async (id_candidato) => {
  return await instance.get(`/eleccion-candidato/changeStateEleccionCandidato/${id_candidato}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getEleccionCandidatoByIdEleccionAll = async (id_eleccion, state) => {
  const payload = {
    id_eleccion: id_eleccion,
    state: state
  };
  return await instance.post(`/eleccion-candidato/candidatosPorEleccionCandidato/`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const createEleccionCandidato = async (payload) => {
  return await instance.post("/eleccion-candidato/createEleccionCandidato", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const updateEleccionCandidato = async (payload) => {
  return await instance.patch(
    `/eleccion-candidato/updateEleccionCandidato/${payload.id_eleccion_candidato}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
