import { useState } from "react";
import { ButtonCreate, ModalEleccionCandidato } from "../../components";
import { AddCandidatoSection } from "../../sections";
import { useAuthStore } from "../../store/auth.store";

const AddCandidatoPage = () => {
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
        <h2 className="text-colorSecundary font-bold text-2xl">Agregar Candidatos</h2>
        {profilePayload === "Administrador" && (
          <ButtonCreate goToCreate={handleOpenModal} text="Agregar Candidatos" />
        )}
      </div>

      <AddCandidatoSection />

      {isModalOpen && <ModalEleccionCandidato isOpen={isModalOpen} onClose={handleCloseModal} />}
    </section>
  );
};
export default AddCandidatoPage;
