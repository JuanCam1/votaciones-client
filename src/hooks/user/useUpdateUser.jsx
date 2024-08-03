import { useState } from "react";
import imgLogo from "../../assets/statics/no-user.webp";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import { updateUsuario } from "../../services";

const useUpdateUser = (selected, setIsEdit, onClose) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isVisiblePass, setIsVisiblePass] = useState(true);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(true);

  const [usuario, setUsuario] = useState({
    id_usuario: selected.id_usuario,
    nombre_usuario: selected.nombre_usuario,
    cedula_usuario: selected.cedula_usuario,
    lastname_usuario: selected.lastname_usuario,
    correo_usuario: selected.correo_usuario,
    password_usuario: "",
    confirm_password_usuario: "",
    foto_usuario: selected.photoUrl,
    role_id: selected.role_id
  });

  const [photoPreview, setPhotoPreview] = useState(
    selected.photoUrl === "sinphoto.jpg" ||
      selected.photoUrl === null ||
      selected.photoUrl === undefined
      ? imgLogo
      : selected.photoUrl
  );

  const changeEdit = () => {
    setIsCheck((prev) => !prev);
  };

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    const pahtUrl = URL.createObjectURL(file);
    setPhotoPreview(pahtUrl);
    setUsuario({ ...usuario, foto_usuario: file });
  };

  const handleChange = (evt) => {
    setUsuario({
      ...usuario,
      [evt.target.name]: evt.target.value
    });
  };

  const changeIsVisble = (option) => {
    if (option === "password") {
      setIsVisiblePass(!isVisiblePass);
    } else {
      setIsVisibleConfirm(!isVisibleConfirm);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const copyValues = { ...usuario };
    delete copyValues.confirm_password_usuario;

    if (usuario.role_id === "0") {
      NotificationError("Debes seleccionar una elección");
      return;
    }

    try {
      await updateUsuario(copyValues).then((res) => {
        if (validateStatus(res.status)) {
          throw Error();
        } else {
          NotificationSucces("Usuario actualizado correctamente");
          setTimeout(() => {
            onClose();
            setIsEdit(true);
          }, 1000);
        }
      });
    } catch (error) {
      NotificationError("Error al actualizar el usuario");
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
    usuario,
    changeIsVisble,
    isVisibleConfirm,
    isVisiblePass
  };
};
export default useUpdateUser;
