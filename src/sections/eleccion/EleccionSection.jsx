import { useState } from "react";
import { useEleccion } from "../../hooks";
import TableEleccionSection from "./TableEleccionSection";
import { Loading, ModalEleccionDetail, Search, ButtonExport } from "../../components";

const EleccionSection = () => {
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
  } = useEleccion();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Search value={filter} handleChange={handleChange} placeholder="Buscar por nombre" />

      <div className="mt-8">
        <div className="flex justify-end ">
          <ButtonExport downloadExcel={downloadExcel} />
        </div>
        {records && (
          <TableEleccionSection
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
        <ModalEleccionDetail
          selected={selected}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};
export default EleccionSection;
