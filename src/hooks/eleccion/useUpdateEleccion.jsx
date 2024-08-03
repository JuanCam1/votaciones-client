import { isAfter, isBefore, isEqual, parse } from "date-fns";
import { useState } from "react";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import { updateEleccion } from "../../services";

const useUpdateEleccion = (id_eleccion, setIsEdit, onClose) => {
  const [isCheck, setIsCheck] = useState(false);

  const changeEdit = () => {
    setIsCheck((prev) => !prev);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
      nombre_eleccion,
      descripcion_eleccion,
      fecha_ini_eleccion,
      fecha_fin_eleccion,
      hora_ini_eleccion,
      hora_fin_eleccion
    } = evt.target;

    const values = {
      id_eleccion: id_eleccion,
      nombre_eleccion: nombre_eleccion.value,
      descripcion_eleccion: descripcion_eleccion.value,
      fecha_ini_eleccion: fecha_ini_eleccion.value,
      fecha_fin_eleccion: fecha_fin_eleccion.value,
      hora_ini_eleccion: hora_ini_eleccion.value,
      hora_fin_eleccion: hora_fin_eleccion.value
    };

    if (Object.values(values).includes("")) {
      NotificationError("Todos los campos son obligatorios");
      return;
    }

    const dateFormat = "yyyy-MM-dd";
    const timeFormat = "HH:mm";

    const fechaInicio = parse(fecha_ini_eleccion.value, dateFormat, new Date());
    const fechaFinEleccion = parse(fecha_fin_eleccion.value, dateFormat, new Date());
    const horaInicio = parse(hora_ini_eleccion.value, timeFormat, new Date());
    const horaFinEleccion = parse(hora_fin_eleccion.value, timeFormat, new Date());

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

    try {
      await updateEleccion(values).then((res) => {
        if (validateStatus(res.status)) {
          throw Error();
        } else {
          NotificationSucces("Elección actualizada correctamente");
          setTimeout(() => {
            onClose();
            setIsEdit(true);
          }, 1000);
        }
      });
    } catch (error) {
      NotificationError("Error al actualizar el elección");
      return;
    }
  };
  return {
    isCheck,
    changeEdit,
    handleSubmit
  };
};
export default useUpdateEleccion;
