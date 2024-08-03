import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CreateVotanteSection } from "../../sections";

const CreateVotantePage = () => {
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
          <h2 className="text-colorSecundary font-bold text-2xl">Creación de Votantes</h2>
          <span className="text-color757575 text-[16px] font-semibold">
            Diligencia los campos para la creación de un votante
          </span>
        </div>
      </div>
      <div className="mt-6">
        <CreateVotanteSection />
      </div>
    </section>
  )
}
export default CreateVotantePage