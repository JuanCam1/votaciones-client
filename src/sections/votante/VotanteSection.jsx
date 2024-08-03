import { ButtonExport, Loading, ModalVotanteDetail, Search } from "../../components";
import { useState } from "react";
import { useVotante } from "../../hooks";
import TableVotanteSection from "./TableVotanteSection";

const VotanteSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const {
    filter,
    records,
    count,
    offset,
    limit,
    loading,
    setIsEdit,
    handlePageChange,
    handleChange,
    downloadExcel,
    handleToggleChange
  } = useVotante();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Search
        value={filter}
        handleChange={handleChange}
        placeholder="Buscar por N. Documento o por nombre"
      />
      <div className="mt-8">
        <div className="flex justify-end ">
          <ButtonExport downloadExcel={downloadExcel} />
        </div>

        {records && (
          <TableVotanteSection
            records={records}
            setSelected={setSelected}
            setModalOpen={setModalOpen}
            handlePageChange={handlePageChange}
            handleToggleChange={handleToggleChange}
            count={count}
            offset={offset}
            limit={limit}
          />
        )}
      </div>
      {isModalOpen && (
        <ModalVotanteDetail
          selected={selected}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};
export default VotanteSection;
