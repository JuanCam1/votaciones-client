import { instance } from "../../utilities";

export const getVotanteByCedulaFecha = async (payload) => {
  return await instance.post(`/votacion/getVotanteByCedulaFecha`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getUsuarioByCorreoCedula = async (payload) => {
  return await instance.post(`/votacion/getUsuarioByCorreoCedula`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const validateTokenVotante = async (payload) => {
  return await instance.post(`/votacion/validateTokenVotante`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const validateTokenUsuario = async (payload) => {
  return await instance.post(`/votacion/validateTokenUsuario`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const createVotoVotante = async (payload) => {
  return await instance.post(`/votacion/createVotoVotante`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const createVotoUsuario = async (payload) => {
  return await instance.post(`/votacion/createVotoUsuario`, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const eleccionesIsVotante = async (id_votante) => {
  return await instance.get(`/votacion/eleccionesIsVotante/${id_votante}`,{
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const eleccionesIsUsuario = async (id_usuario) => {
  return await instance.get(`/votacion/eleccionesIsUsuario/${id_usuario}`,{
    headers: {
      "Content-Type": "application/json"
    }
  });
};
