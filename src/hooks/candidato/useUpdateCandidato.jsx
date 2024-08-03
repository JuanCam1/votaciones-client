import { useState } from "react";
import { updateCandidato } from "../../services";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import imgLogo from "../../assets/statics/no-user.webp";

const useUpdateCandidato = (selected, setIsEdit, onClose) => {
  const [isCheck, setIsCheck] = useState(false);
  const [candidato, setCandidato] = useState({
    id_candidato: selected.id_candidato,
    cedula_candidato: selected.cedula_candidato,
    nombre_candidato: selected.nombre_candidato,
    foto_candidato: selected.photoUrl,
  });

  const [photoPreview, setPhotoPreview] = useState(
    selected.photoUrl === "sinphoto.jpg" ? imgLogo : selected.photoUrl
  );

  const changeEdit = () => {
    setIsCheck((prev) => !prev);
  };


  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    const pahtUrl = URL.createObjectURL(file);
    setPhotoPreview(pahtUrl);
    setCandidato({ ...candidato, foto_candidato: file });
  };

  const handleChange = (evt) => {
    setCandidato({
      ...candidato,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (Object.values(candidato).includes("")) {
      NotificationError("Todos los campos son obligatorios");
      return;
    }

    try {
      await updateCandidato(candidato).then((res) => {
        if (validateStatus(res.status)) {
          throw Error();
        } else {
          NotificationSucces("Candidato actualizado correctamente");
          setTimeout(() => {
            onClose();
            setIsEdit(true);
          }, 1000);
        }
      });
    } catch (error) {
      NotificationError("Error al actualizar el candidato");
      return;
    }
  };

  return {
    handleChangeImage,
    handleChange,
    handleSubmit,
    changeEdit,
    photoPreview,
    isCheck,
    candidato
  };
};
export default useUpdateCandidato;
