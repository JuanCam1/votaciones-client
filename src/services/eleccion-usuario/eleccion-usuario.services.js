import { instance } from "../../utilities";

export const getEleccionUsuarioAll = async (limit, offset, filter) => {
  const payload = { limit, offset };

  if (filter) {
    payload.filter = filter;
  }
  return await instance.post("/eleccion-usuario/getEleccionUsuarioAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const changeStateEleccionUsuario = async (id_usuario) => {
  return await instance.get(`/eleccion-usuario/changeStateEleccionUsuario/${id_usuario}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getEleccionUsuarioByIdEleccionAll = async (id_eleccion, state) => {
  const payload = {
    id_eleccion: id_eleccion,
    state: state
  };
  return await instance.post(`/eleccion-usuario/UsuariosPorEleccionUsuario`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const createEleccionUsuario = async (payload) => {
  return await instance.post("/eleccion-usuario/createEleccionUsuario", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const updateEleccionUsuario = async (payload) => {
  return await instance.patch(
    `/eleccion-usuario/updateEleccionUsuario/${payload.id_eleccion_candidato}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
