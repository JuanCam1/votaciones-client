import { useFormik } from "formik";
import { createCandidato } from "../../services";
import { CreateCandidatoSchema } from "../../schemas/candidato/CreateCandidatoSchema";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import imgLogo from "../../assets/statics/no-user.webp";

const initialValues = {
  cedula_candidato: "",
  nombre_candidato: "",
  foto_candidato: "",
  estado_id: "0"
};
const useCreateCandidato = (setPhotoPreview) => {

  const { values, handleChange, errors, ...formik } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        await createCandidato(values).then((res) => {
          if (validateStatus(res.status)) {
            throw Error();
          }
          NotificationSucces("Candidato creado correctamente");
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
        NotificationError("Error al crear el candidato");
        return;
      }
    },
    validationSchema: CreateCandidatoSchema
  });

  const handleSubmitSection = (e) => {
    e.preventDefault();
    const validateValues = { ...values };
    delete validateValues.foto_candidato;

    if (values.estado_id === "0") {
      NotificationError("Debes seleccionar un estado");
      return;
    }

    if (Object.values(validateValues).includes("")) {
      NotificationError("Todos los campos son obligatorios");
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
    formik.setFieldValue("foto_candidato", file);
    setPhotoPreview(pahtUrl);
  };

  return {
    values,
    errors,
    formik,
    handleChange,
    handleSubmitSection,
    handleChangeImage
  };
};
export default useCreateCandidato;
