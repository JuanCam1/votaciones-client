import { mixed, object, string } from "yup";

export const CreateUserSchema = object().shape({
  cedula_usuario: string()
    .required("N. Cédula es requerido")
    .min(5, "Cédula tiene menos de la cantidad de caracteres aceptados")
    .max(20, "Cédula tiene más de la cantidad de caracteres aceptados"),
  nombre_usuario: string()
    .required("Los nombres son requeridos")
    .min(3, "Los nombre tiene menos de la cantidad de caracteres aceptados")
    .max(20, "Los nombre tiene más de la cantidad de caracteres aceptados"),
  lastname_usuario: string()
    .required("Los apellidos es requerida")
    .min(3, "Los apellidos tiene menos de la cantidad de caracteres aceptados")
    .max(20, "Los apellidos tiene más de la cantidad de caracteres aceptados"),
  correo_usuario: string().required("El correo es requeridos").email("El correo es invalido"),
  password_usuario: string()
    .required("La contreseña es requerida")
    .min(6, "La contreseña tiene menos de la cantidad de caracteres aceptados")
    .max(20, "La contresña tiene más de la cantidad de caracteres aceptados"),
  confirm_password_usuario: string().required("La confirmación de la contreseña es requerida"),
  foto_usuario: mixed().notRequired(),
  role_id: string().required("El perfil es requerido"),
  estado_id: string().required("El estado es requerido")
});
