import { useState } from "react";
import { CreateUserSchema } from "../../schemas/user/CreateUserSchema";
import { useFormik } from "formik";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import { createUsuario } from "../../services/user/user.services";
import imgLogo from "../../assets/statics/no-user.webp";

const initialValues = {
  cedula_usuario: "",
  nombre_usuario: "",
  lastname_usuario: "",
  correo_usuario: "",
  password_usuario: "",
  confirm_password_usuario: "",
  foto_usuario: "",
  role_id: "0",
  estado_id: "0"
};
const useCreateUser = (setPhotoPreview) => {
  const [isVisiblePass, setIsVisiblePass] = useState(true);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(true);

  const { values, handleChange, errors, ...formik } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const copyValues = { ...values };
        delete copyValues.confirm_password_usuario;

        await createUsuario(copyValues).then((res) => {
          if (validateStatus(res.status)) {
            throw Error();
          }
          NotificationSucces("Usuario creado correctamente");
        });
        setTimeout(() => {
          formik.resetForm();
          setPhotoPreview(imgLogo);
        }, 2000);
      } catch (error) {
        if (error.response.data.error.message === "Candidato exists") {
          NotificationError("El candidato ya existe");
          return;
        }
        NotificationError("Error al crear el usuario");
        return;
      }
    },
    validationSchema: CreateUserSchema
  });

  const changeIsVisble = (option) => {
    if (option === "password") {
      setIsVisiblePass(!isVisiblePass);
    } else {
      setIsVisibleConfirm(!isVisibleConfirm);
    }
  };

  const handleSubmitSection = (e) => {
    e.preventDefault();

    const validateValues = { ...values };
    delete validateValues.foto_usuario;

    if (Object.values(validateValues).includes("")) {
      NotificationError("Todos los campos son obligatorios");
      return;
    }

    if (values.role_id === "0") {
      NotificationError("Debes seleccionar un perfil");
      return;
    }

    if (values.estado_id === "0") {
      NotificationError("Debes seleccionar un estado");
      return;
    }

    if (values.password_usuario !== values.confirm_password_usuario) {
      NotificationError("Contraseñas no coinciden");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(values.password_usuario)) {
      NotificationError(
        "La contraseña debe tener al menos 6 caracteres, incluyendo mayúsculas, minúsculas, números y un símbolo."
      );
      return;
    }

    if (Object.values(errors).length > 0) {
      const values = Object.values(errors);
      NotificationError(values[0]);
      return;
    }

    formik.handleSubmit();
  };

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    const pahtUrl = URL.createObjectURL(file);
    formik.setFieldValue("foto_usuario", file);
    setPhotoPreview(pahtUrl);
  };
  return {
    values,
    isVisiblePass,
    isVisibleConfirm,
    handleChangeImage,
    handleChange,
    handleSubmitSection,
    changeIsVisble
  };
};
export default useCreateUser;
