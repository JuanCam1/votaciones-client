import { ButtonExport, ModalUsuarioDetail } from "../../components";
import TableUserSection from "./TableUserSection";
import { useState } from "react";
import { useUser } from "../../hooks";
import { Loading, Search } from "../../components";

const UserSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const {
    filter,
    records,
    loading,
    count,
    offset,
    limit,
    setIsEdit,
    handlePageChange,
    handleChange,
    downloadExcel,
    handleToggleChange
  } = useUser();

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
          <TableUserSection
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
        <ModalUsuarioDetail
          selected={selected}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};
export default UserSection;
