import { useNavigate } from "react-router-dom";
import { pathsRoutes } from "../../routers/pathsRoutes.js";
import { CandidatoSection } from "../../sections/index.js";
import { ButtonCreate } from "../../components/index.js";
import { useAuthStore } from "../../store/auth.store.js";

const CandidatoPage = () => {
  const navigate = useNavigate();
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  const goCreateCandidato = () => {
    navigate(`/dash/${pathsRoutes.CREATECANDIDATO}`);
  };
  return (
    <section className="px-8 py-5 font-Montserrat max-md:pl-5 max-md:pr-2">
      <div className="flex justify-between">
        <h2 className="text-colorSecundary font-bold text-2xl">Administración de Candidatos</h2>
        {profilePayload === "Administrador" && (
          <ButtonCreate goToCreate={goCreateCandidato} text="Crear Candidato" />
        )}
      </div>

      <CandidatoSection />
    </section>
  );
};
export default CandidatoPage;
