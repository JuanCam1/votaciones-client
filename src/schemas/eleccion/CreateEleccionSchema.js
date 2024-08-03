import { object, string } from "yup";

export const CreateEleccionSchema = object().shape({
  nombre_eleccion: string()
    .required("El nombre es requerido")
    .min(2, "El nombre tiene menos de la cantidad de caracteres aceptados")
    .max(200, "El nombre tiene más de la cantidad de caracteres aceptados"),
  descripcion_eleccion: string()
    .required("La descripcion son requeridos")
    .min(2, "La descripcion tiene menos de la cantidad de caracteres aceptados")
    .max(800, "La descripcion tiene más de la cantidad de caracteres aceptados"),
  fecha_ini_eleccion: string()
    .required("La fecha inicio es requerida")
    .min(2, "La fecha tiene menos de la cantidad de caracteres aceptados")
    .max(40, "La fecha tiene más de la cantidad de caracteres aceptados"),
  fecha_fin_eleccion: string()
    .required("La fecha fin es requerida")
    .min(2, "La fecha tiene menos de la cantidad de caracteres aceptados")
    .max(40, "La fecha tiene más de la cantidad de caracteres aceptados"),
  hora_ini_eleccion: string()
    .required("La hora de inicio es requerida")
    .min(2, "a hora tiene menos de la cantidad de caracteres aceptados")
    .max(40, "a hora tiene más de la cantidad de caracteres aceptados"),
  hora_fin_eleccion: string()
    .required("Hora de fin es requerida")
    .min(2, "La hora de fin tiene menos de la cantidad de caracteres aceptados")
    .max(40, "La hora de fin tiene más de la cantidad de caracteres aceptados"),
  estado_id: string().required("El estado es requerido")
});
