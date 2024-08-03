import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CreateEleccionSection } from "../../sections";

const CreateEleccionPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="px-8 py-5 font-Montserrat ">
      <div className="flex gap-6 items-start mb-8">
        <span
          onClick={goBack}
          className="cursor-pointer rounded-md p-2 transition-all delay-75 hover:bg-gray-300"
        >
          <FaArrowLeft className="size-6 text-color757575" />
        </span>
        <div className="flex flex-col gap-4 pt-1">
          <h2 className="text-colorSecundary font-bold text-2xl">Creación de Elecciones</h2>
          <span className="text-color757575 text-[16px] font-semibold">
            Diligenciar los campos para la creación de la elección
          </span>
        </div>
      </div>
      <div className="mt-6">
        <CreateEleccionSection />
      </div>
    </section>
  );
};
export default CreateEleccionPage;
