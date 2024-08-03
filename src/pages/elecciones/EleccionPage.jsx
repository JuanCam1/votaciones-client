import { useNavigate } from "react-router-dom";
import { pathsRoutes } from "../../routers/pathsRoutes";
import { EleccionSection } from "../../sections";
import { ButtonCreate } from "../../components";
import { useAuthStore } from "../../store/auth.store";

const EleccionPage = () => {
  const navigate = useNavigate();
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");
  const goCreateEleccion = () => {
    navigate(`/dash/${pathsRoutes.CREATEELECCION}`);
  };
  return (
    <section className="px-8 py-5 font-Montserrat">
      <div className="flex justify-between">
        <h2 className="text-colorSecundary font-bold text-2xl">Administración de Elecciones</h2>
        {profilePayload === "Administrador" && (
          <ButtonCreate goToCreate={goCreateEleccion} text="Crear Elección" />
        )}
      </div>

      <EleccionSection />
    </section>
  );
};
export default EleccionPage;
