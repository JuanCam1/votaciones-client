import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { CreateEleccionSchema } from "../../schemas/eleccion/CreateEleccionSchema";
import { createEleccion, getStadoTotal } from "../../services";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import { parse, isBefore, isAfter, isEqual } from "date-fns";

const initialValues = {
  nombre_eleccion: "",
  descripcion_eleccion: "",
  fecha_ini_eleccion: "",
  fecha_fin_eleccion: "",
  hora_ini_eleccion: "",
  hora_fin_eleccion: "",
  estado_id: "0"
};
const useCreateEleccion = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getStadoTotal();
        setEstados(data.data);
      } catch (error) {
        NotificationError("Error al cargar sedes");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { values, handleChange, errors, ...formik } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        await createEleccion(values).then((res) => {
          if (validateStatus(res.status)) {
            throw Error();
          } else {
            NotificationSucces("Elección creada correctamente");
            setTimeout(() => {
              formik.resetForm();
            }, 2000);
          }
        });
      } catch (error) {
        if (error.response.data.error.message === "Eleccion exists") {
          NotificationError("Elección ya existe");
          return;
        } else {
          NotificationError("Error al crear la elección");
          return;
        }
      }
    },

    validationSchema: CreateEleccionSchema
  });

  const handleSubmitSection = (e) => {
    e.preventDefault();
    const {
      fecha_ini_eleccion,
      fecha_fin_eleccion,
      hora_ini_eleccion,
      hora_fin_eleccion,
      estado_id
    } = values;

    const copyValues = { ...values };
    delete copyValues.estado_id;

    if (Object.values(copyValues).includes("")) {
      NotificationError("Todos los campos son obligatorios");
      return;
    }

    if (estado_id === "0") {
      NotificationError("Seleccione un estado");
      return;
    }

    const dateFormat = "yyyy-MM-dd";
    const timeFormat = "HH:mm";

    const fechaInicio = parse(fecha_ini_eleccion, dateFormat, new Date());
    const fechaFinEleccion = parse(fecha_fin_eleccion, dateFormat, new Date());
    const horaInicio = parse(hora_ini_eleccion, timeFormat, new Date());
    const horaFinEleccion = parse(hora_fin_eleccion, timeFormat, new Date());

    if (isAfter(fechaInicio, fechaFinEleccion)) {
      NotificationError("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    if (isBefore(fechaFinEleccion, new Date())) {
      NotificationError("La fecha de fin no puede ser menor a la fecha actual");
      return;
    }

    if (
      isEqual(fechaInicio, fechaFinEleccion) &&
      (isAfter(horaInicio, horaFinEleccion) || isEqual(horaInicio, horaFinEleccion))
    ) {
      NotificationError("La hora de inicio no puede ser mayor o igual a la hora de fin");
      return;
    }

    if (Object.values(errors).length > 0) {
      const values = Object.values(errors);
      NotificationError(values[0]);
      return;
    }

    formik.handleSubmit();
  };

  return {
    handleChange,
    handleSubmitSection,
    values,
    errors,
    estados,
    loading,
    formik
  };
};

export default useCreateEleccion;
