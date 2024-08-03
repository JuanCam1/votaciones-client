import { useRef, useState } from "react";
import { ModalValidate } from "../../components";
import NavbarVotacion from "./NavbarVotacion";
import FormularioVotacion from "./FormularioVotacion";
import TablaEleccionVotacion from "./TablaEleccionVotacion";

const VotacionPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [idVotante, setIdVotante] = useState(0);
  const [isValidate, setIsValidate] = useState([]);
  const [nameVotante, setNameVotante] = useState("");

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const formRef = useRef(null);

  const handleReset = () => {
    setNameVotante("");
    setIdVotante("");
    setIsValidate([]);
    formRef.current.reset();
  };

  return (
    <div className="font-Montserrat pb-8">
      <NavbarVotacion />
      <div className="flex justify-center pt-12 relative px-3">
        <div className="max-w-[1200px] w-full flex flex-col justify-center items-center">
          <h2 className="text-center text-pretty uppercase font-semibold max-md:text-sm">
            Elección del Directivo Docente en representación de la Secretaria de Educación de Nariño
            ante el Comité Regional de Salud y Prestaciones Económicas de acuerdo a lo expuesto en
            el Decreto 0942 de junio de 2022
          </h2>
          <h2 className="mt-8 text-center text-pretty uppercase font-semibold">
            Para consultar las elecciones disponibles ingrese fecha de expedición y número de
            documento
          </h2>
          <FormularioVotacion
            handleReset={handleReset}
            nameVotante={nameVotante}
            setNameVotante={setNameVotante}
            isValidate={isValidate}
            setIdVotante={setIdVotante}
            setIsModal={setIsModal}
            setIsValidate={setIsValidate}
            ref={formRef}
          />

          {isValidate.length > 0 && (
            <TablaEleccionVotacion
              handleReset={handleReset}
              setIsValidate={setIsValidate}
              isValidate={isValidate}
              idVotante={idVotante}
            />
          )}
        </div>
      </div>
      {isModal && (
        <ModalValidate
          setIsValidate={setIsValidate}
          idVotante={idVotante}
          isOpen={isModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
export default VotacionPage;
