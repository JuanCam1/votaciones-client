import { VotanteSection } from "../../sections";

const VotantePage = () => {
  return (
    <section className="px-8 py-5 font-Montserrat max-md:pl-5 max-md:pr-2">
      <div className="flex justify-between">
        <h2 className="text-colorSecundary font-bold text-2xl">Administración de Votantes</h2>
      </div>

      <VotanteSection />
    </section>
  );
};
export default VotantePage;
