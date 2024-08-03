import { ButtonExport, Loading, ModalCandidatoDetail, Search } from "../../components";
import TableCandidatoSection from "./TableCandidatoSection";
import { useState } from "react";
import { useCandidato } from "../../hooks";

const CandidatoSection = () => {
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
  } = useCandidato();

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
          <TableCandidatoSection
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
        <ModalCandidatoDetail
          selected={selected}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};
export default CandidatoSection;
