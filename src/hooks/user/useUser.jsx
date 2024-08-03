import { useEffect, useState } from "react";
import { changeStateUsuario, downloadExcelUsuario, getUsuarioAll } from "../../services";
import { NotificationError } from "../../utilities";

const useUser = () => {
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const limit = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
      setOffset(0);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getUsuarioAll(limit, offset, debouncedFilter);

        setRecords(data.data.usuarios);
        setCount(data.data.count);
      } catch (error) {
        if (error.response.data.error.message == "Is empty") {
          NotificationError("No hay usuarios");
        } else {
          NotificationError("Error al cargar los usuarios");
        }
      } finally {
        setLoading(false);
        setIsEdit(false);
      }
    };
    fetchData();
  }, [offset, isEdit, debouncedFilter]);

  const handlePageChange = (operation) => {
    switch (operation) {
      case "next":
        if (offset + limit < count) {
          setOffset(offset + limit);
        }
        break;
      case "prev":
        if (offset > 0) {
          setOffset(offset - limit);
        }
        break;
    }
  };

  const handleChange = (e) => {
    const value = e.target.value || "";
    setFilter(value);
  };

  const downloadExcel = async (e) => {
    e.preventDefault();
    try {
      const response = await downloadExcelUsuario("Todos");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Usuarios.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      NotificationError("No se ha podido descargar");
    }
  };

  const handleToggleChange = async (id) => {
    return await changeStateUsuario(id);
  };

  return {
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
  };
};
export default useUser;
