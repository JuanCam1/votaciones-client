import { instance } from "../../utilities";

export const getEleccionVotanteAll = async (limit, offset, filter) => {
  const payload = { limit, offset };

  if (filter) {
    payload.filter = filter;
  }
  return await instance.post("/eleccion-votante/getEleccionVotanteAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const votantesPorEleccionVotante = async (limit, offset, id_eleccion) => {
  const payload = { limit, offset };

  return await instance.post(
    `/eleccion-votante/votantesPorEleccionVotante/${id_eleccion}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const createEleccionVotante = async (user) => {
  const copyUser = { ...user };
  delete copyUser.confirmPasswordUser;

  const formData = new FormData();

  for (const [key, value] of Object.entries(copyUser)) {
    formData.append(key, value);
  }

  return await instance.post("/eleccion-votante/createEleccionVotante", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// export const updateEleccionVotante = async (user) => {
//   const copyUser = { ...user };
//   delete copyUser.confirmPasswordUser;

//   const formData = new FormData();

//   for (const [key, value] of Object.entries(copyUser)) {
//     formData.append(key, value);
//   }

//   return await instance.patch(
//     `/eleccion-votant/updateEleccionVotante/${user.id_usuario}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }
//   );
// };

export const changeStateEleccionVotante = async (id_votante) => {
  return await instance.get(`/eleccion-votante/changeStateEleccionVotante/${id_votante}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// export const getEleccionVotanteById = async (idUser) => {
//   return await instance.get(`/eleccion-votante/updateEleccionVotante/${idUser}`);
// };

export const downloadExcelEleccionVotante = async (id_eleccion) => {
  return await instance.get(`/eleccion-votante/getDownloadExcel/${id_eleccion}`, {
    responseType: "blob"
  });
};

export const getEleccionVotanteByIdEleccionAll = async (limit, offset, id_eleccion) => {
  const payload = { limit, offset };

  if (id_eleccion) {
    payload.id_eleccion = id_eleccion;
  }
  return await instance.post("/eleccion-votante/getEleccionVotanteByIdEleccionAll", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const uploadExcelEleccionVotante = async (file, id_eleccion) => {
  const formData = new FormData();
  formData.append("file", file);

  return await instance.post(`/files/uploadFile/${id_eleccion}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
