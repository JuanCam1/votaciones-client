import { useNavigate } from "react-router-dom";
import { UserSection } from "../../sections";
import { pathsRoutes } from "../../routers/pathsRoutes";
import { ButtonCreate } from "../../components";
import { useAuthStore } from "../../store/auth.store";

const UsuarioPage = () => {
  const navigate = useNavigate();
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  const goCreateUser = () => {
    navigate(`/dash/${pathsRoutes.CREATEUSUARIO}`);
  };
  return (
    <section className="px-8 py-5 font-Montserrat max-md:pl-5 max-md:pr-2">
      <div className="flex justify-between">
        <h2 className="text-colorSecundary font-bold text-2xl">Administración de Usuarios</h2>
        {profilePayload === "Administrador" && (
          <ButtonCreate goToCreate={goCreateUser} text="Crear Usuario" />
        )}
      </div>

      <UserSection />
    </section>
  );
};
export default UsuarioPage;
