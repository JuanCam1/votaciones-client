import { ReporteSection } from "../../sections";

const ReportePage = () => {
  return (
    <section className="px-8 py-5 font-Montserrat">
      <div className="flex justify-between">
        <h2 className="text-colorSecundary font-bold text-2xl">Gestión de Reportes</h2>
      </div>

      <ReporteSection />
    </section>
  );
};
export default ReportePage;
