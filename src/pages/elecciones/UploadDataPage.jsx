import { useState } from "react";
import { UploadDataSection } from "../../sections";
import { ButtonCreate, ModalUploadVotantes } from "../../components";
import { useAuthStore } from "../../store/auth.store";

const UploadDataPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  return (
    <section className="px-8 py-5 font-Montserrat">
      <div className="flex justify-between">
        <h2 className="text-colorSecundary font-bold text-2xl">Carga de Información</h2>
        {profilePayload === "Administrador" && (
          <ButtonCreate goToCreate={handleOpenModal} text="Cargar Votantes" />
        )}
      </div>

      <UploadDataSection />
      {isModalOpen && <ModalUploadVotantes isOpen={isModalOpen} onClose={handleCloseModal} />}
    </section>
  );
};
export default UploadDataPage;
