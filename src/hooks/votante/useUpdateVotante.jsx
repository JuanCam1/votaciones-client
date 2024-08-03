import { useState } from "react";
import { isAfter, isBefore, isEqual, parse } from "date-fns";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import { updateVotante } from "../../services";

const useUpdateVotante = (id_votante, setIsEdit, onClose) => {
  const [isCheck, setIsCheck] = useState(false);

  const changeEdit = () => {
    setIsCheck((prev) => !prev);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
      cedula_votante,
      fecha_expedicion_votante,
      fecha_nacimiento_votante,
      fecha_ingreso_votante,
      primer_nombre_votante,
      segundo_nombre_votante,
      primer_apellido_votante,
      segundo_apellido_votante,
      correo_corporativo_votante,
      correo_personal_votante,
      telefono_votante,
      carrera_votante,
      nombre_dependencia_votante,
      nombre_nivel_votante,
      codigo_cargo_votante,
      nombre_cargo_votante,
      grado_votante,
      codigo_categoria_votante,
      codigo_escalafon_votante,
      nombre_escalafon_votante,
      codigo_municipio_votante,
      nombre_municipio_votante
    } = evt.target;

    const segundoNombre = segundo_nombre_votante ? segundo_nombre_votante.value : null;
    const segundoApellido = segundo_apellido_votante ? segundo_apellido_votante.value : null;

    const values = {
      id_votante: id_votante,
      cedula_votante: cedula_votante.value,
      fecha_expedicion_votante: fecha_expedicion_votante.value,
      fecha_nacimiento_votante: fecha_nacimiento_votante.value,
      fecha_ingreso_votante: fecha_ingreso_votante.value,
      primer_nombre_votante: primer_nombre_votante.value,
      primer_apellido_votante: primer_apellido_votante.value,
      correo_corporativo_votante: correo_corporativo_votante.value,
      correo_personal_votante: correo_personal_votante.value,
      telefono_votante: telefono_votante.value,
      carrera_votante: carrera_votante.value,
      nombre_dependencia_votante: nombre_dependencia_votante.value,
      nombre_nivel_votante: nombre_nivel_votante.value,
      codigo_cargo_votante: codigo_cargo_votante.value,
      nombre_cargo_votante: nombre_cargo_votante.value,
      grado_votante: grado_votante.value,
      codigo_categoria_votante: codigo_categoria_votante.value,
      codigo_escalafon_votante: codigo_escalafon_votante.value,
      nombre_escalafon_votante: nombre_escalafon_votante.value,
      codigo_municipio_votante: codigo_municipio_votante.value,
      nombre_municipio_votante: nombre_municipio_votante.value
    };

    if (Object.values(values).includes("")) {
      NotificationError("Todos los campos son obligatorios");
      return;
    }

    const dateFormat = "yyyy-MM-dd";
    const fechaExpedicion = parse(fecha_expedicion_votante.value, dateFormat, new Date());
    const fechaNacimiento = parse(fecha_nacimiento_votante.value, dateFormat, new Date());
    const fechaIngreso = parse(fecha_ingreso_votante.value, dateFormat, new Date());
    const dateCurrent = new Date();

    if (
      isAfter(fechaExpedicion, dateCurrent) ||
      isAfter(fechaNacimiento, dateCurrent) ||
      isAfter(fechaIngreso, dateCurrent)
    ) {
      NotificationError("La fechas no pueden ser superiores a la fecha actual");
      return;
    }

    if (isAfter(fechaNacimiento, fechaExpedicion)) {
      NotificationError("La fecha de nacimiento no puede ser mayor a la fecha de expedición");
      return;
    }

    if (isBefore(fechaIngreso, fechaExpedicion)) {
      NotificationError("La fecha de ingreso no puede ser menor a la fecha de expedición");
      return;
    }

    if (isBefore(fechaIngreso, fechaNacimiento)) {
      NotificationError("La fecha de ingreso no puede ser menor a la fecha de nacimiento");
      return;
    }

    if (isEqual(fechaIngreso, fechaExpedicion) || isEqual(fechaIngreso, fechaNacimiento)) {
      NotificationError(
        "La fecha de ingreso no puede ser igual a la fecha de expedición o nacimiento"
      );
      return;
    }

    const correoCorpoValid = correo_corporativo_votante.value.trim();
    const correoPersValid = correo_personal_votante.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correoCorpoValid) || !emailRegex.test(correoPersValid)) {
      NotificationError("Correo electrónico no válido");
      return;
    }

    const copyValues = {
      ...values,
      segundo_nombre_votante: segundoNombre,
      segundo_apellido_votante: segundoApellido
    };

    try {
      await updateVotante(copyValues).then((res) => {
        if (validateStatus(res.status)) {
          throw Error();
        } else {
          NotificationSucces("Votante actualizado correctamente");
          setTimeout(() => {
            onClose();
            setIsEdit(true);
          }, 1000);
        }
      });
    } catch (error) {
      NotificationError("Error al actualizar el votante");
      return;
    }
  };

  return {
    isCheck,
    changeEdit,
    handleSubmit
  };
};
export default useUpdateVotante;
