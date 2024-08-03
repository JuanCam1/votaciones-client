import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { ButtonCreate, ModalEleccionUsuario } from "../../components";
import { AddUsuarioSection } from "../../sections";

const AddUsuarioPage = () => {
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
        <h2 className="text-colorSecundary font-bold text-2xl">Agregar Usuarios</h2>
        {profilePayload === "Administrador" && (
          <ButtonCreate goToCreate={handleOpenModal} text="Agregar Usuarios" />
        )}
      </div>

      <AddUsuarioSection />

      {isModalOpen && <ModalEleccionUsuario isOpen={isModalOpen} onClose={handleCloseModal} />}
    </section>
  );
};
export default AddUsuarioPage;
