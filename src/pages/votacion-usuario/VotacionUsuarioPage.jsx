import FormularioVotacionUsuario from "./FormularioVotacionUsuario";
import { useState } from "react";
import TableEleccionUsuario from "./TableEleccionUsuario";
import { ModalValiateUsuario } from "../../components";

const VotacionUsuarioPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [idUsuario, setIdUsuario] = useState(0);
  const [isValidate, setIsValidate] = useState([]);

  const handleCloseModal = () => {
    setIsModal(false);
  };
  return (
    <>
      <div className="flex justify-center pt-12 relative">
        <div className="max-w-[1200px] w-full flex flex-col justify-center items-center">
          <h2 className="text-center text-pretty uppercase font-semibold">
            Elección del Directivo Docente en representación de la Secretaria de Educación de Nariño
            ante el Comité Regional de Salud y Prestaciones Económicas de acuerdo a lo expuesto en
            el Decreto 0942 de junio de 2022
          </h2>
          <h2 className="mt-8 text-center text-pretty uppercase font-semibold">
            Para consultar las elecciones disponibles ingrese fecha de expedición y número de
            documento
          </h2>
          <FormularioVotacionUsuario
            isValidate={isValidate}
            setIdUsuario={setIdUsuario}
            setIsModal={setIsModal}
            setIsValidate={setIsValidate}
          />

          {isValidate.length > 0 && (
            <TableEleccionUsuario
              setIsValidate={setIsValidate}
              isValidate={isValidate}
              idUsuario={idUsuario}
            />
          )}
        </div>
      </div>
      {isModal && (
        <ModalValiateUsuario
          setIsValidate={setIsValidate}
          idUsuario={idUsuario}
          isOpen={isModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
export default VotacionUsuarioPage;
