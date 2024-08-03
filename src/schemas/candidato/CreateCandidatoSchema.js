import { mixed, object, string } from "yup";

export const CreateCandidatoSchema = object().shape({
  cedula_candidato: string()
    .required("N. Cédula es requerido")
    .min(5, "Cédula tiene menos de la cantidad de caracteres aceptados")
    .max(20, "Cédula tiene más de la cantidad de caracteres aceptados"),
  nombre_candidato: string()
    .required("Los nombres son requeridos")
    .min(3, "Los nombre tiene menos de la cantidad de caracteres aceptados")
    .max(20, "Los nombre tiene más de la cantidad de caracteres aceptados"),
  foto_candidato: mixed().notRequired(),
  estado_id: string().required("El estado es requerido")
});
