import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { createCandidato, getEleccionState } from "../../services";
import { CreateCandidatoSchema } from "../../schemas/candidato/CreateCandidatoSchema";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import imgLogo from "../../assets/statics/no-user.webp";

const initialValues = {
  cedula_candidato: "",
  nombre_candidato: "",
  foto_candidato: "",
  eleccion_id: "0",
  estado_id: "0"
};
const useCreateVotante = (setPhotoPreview) => {
  const [elecciones, setElecciones] = useState([]);
  const [loadingElec, setELoadingElc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setELoadingElc(true);
      try {
        const { data } = await getEleccionState("Activo");
        setElecciones(data.data);
      } catch (error) {
        NotificationError("Error al cargar elecciones");
      } finally {
        setELoadingElc(false);
      }
    };
    fetchData();
  }, []);

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

    if (values.eleccion_id === "0") {
      NotificationError("Debes seleccionar una elección");
      return;
    }

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
    elecciones,
    loadingElec,
    values,
    errors,
    formik,
    handleChange,
    handleSubmitSection,
    handleChangeImage
  };
};
export default useCreateVotante;
