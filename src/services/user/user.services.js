import { instance } from "../../utilities";

export const getUsuarioAll = async (limit, offset, filter) => {
  const payload = { limit, offset };

  if (filter) {
    payload.filter = filter;
  }
  return await instance.post("/usuario/getUsuarioAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getUsuarioAllState = async (state) => {
  return await instance.get(`/usuario/getUsuarioAllState/${state}`);
};

export const createUsuario = async (user) => {
  const copyUser = { ...user };
  delete copyUser.confirmPasswordUser;

  const formData = new FormData();

  for (const [key, value] of Object.entries(copyUser)) {
    formData.append(key, value);
  }

  return await instance.post("/usuario/createUsuario", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const updateUsuarioNavbar = async (user) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(user)) {
    formData.append(key, value);
  }

  return await instance.patch(`/usuario/updateNavbarUsuario/${user.id_usuario}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const updateUsuario = async (user) => {
  const copyUser = { ...user };
  delete copyUser.confirmPasswordUser;

  const formData = new FormData();

  for (const [key, value] of Object.entries(copyUser)) {
    formData.append(key, value);
  }

  return await instance.patch(`/usuario/updateUsuario/${user.id_usuario}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const changeStateUsuario = async (idUser) => {
  return await instance.get(`/usuario/changeStateUsuario/${idUser}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getUsuarioById = async (idUser) => {
  return await instance.get(`/usuario/getUsuarioById/${idUser}`);
};

export const downloadExcelUsuario = async (state) => {
  return await instance.get(`/usuario/getDownloadExcelUsuario/${state}`, { responseType: "blob" });
};
