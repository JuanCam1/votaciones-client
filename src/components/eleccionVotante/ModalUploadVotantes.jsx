import { useEffect, useState } from "react";
import ButtonCustom from "../ui/ButtonCustom";
import Modal from "../ui/Modal";
import { getEleccionState, uploadExcelEleccionVotante } from "../../services";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";

const ModalUploadVotantes = ({ isOpen, onClose }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileExcel, setFileExcel] = useState(null);
  const [eleccionId, setEleccionId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getEleccionState("Activo");
        setRecords(data.data);
      } catch (error) {
        NotificationError("Error al cargar las elecciones");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (evt) => {
    const [file] = evt.target.files;
    setFileExcel(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileExcel) {
      NotificationError("Debe seleccionar un archivo");
      return;
    }

    try {
      await uploadExcelEleccionVotante(fileExcel, eleccionId).then((res) => {
        if (validateStatus(res.status)) {
          throw Error();
        } else {
          NotificationSucces("Votantes agregados correctamente");
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      });
    } catch (error) {
      NotificationError("Error al agragar los votantes");
    }
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={"Cargar Votantes"}
      mostrarHeader={true}
      mostrarOverlay={true}
      posicionModal={"center"}
      padding={"p-5"}
      heighModal={"h-auto"}
      widthModal={"w-[700px]"}
    >
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 flex flex-col gap-8 border border-gray-300 rounded-md shadow-md py-8"
        >
          <div>
            <label htmlFor="eleccion_id" className="block text-sm font-bold text-gray-800 mb-2">
              Elección <span className="text-red-600">*</span>
            </label>
            <select
              value={eleccionId}
              onChange={(e) => {
                setEleccionId(e.target.value);
              }}
              id="eleccion_id"
              name="eleccion_id"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="0">Seleccione la elección</option>
              {loading ? (
                <option value="0">Cargando Elecciones</option>
              ) : records.length > 0 ? (
                records.map((eleccion) => (
                  <option key={eleccion.id_eleccion} value={eleccion.id_eleccion}>
                    {eleccion.nombre_eleccion}
                  </option>
                ))
              ) : (
                <option value="0">No hay elecciones</option>
              )}
            </select>
          </div>

          <div className="">
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Votantes <span className="text-red-600">*</span>
            </label>
            <input
              onChange={handleChange}
              name="documentsReport"
              multiple
              accept=".xls, .xlsx, .csv"
              type="file"
              className="cursor-pointer block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-colorPrimary file:text-colorText hover:file:bg-colorPrimary file:disabled:opacity-50 file:disabled:pointer-events-none"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4 ">
            <ButtonCustom
              widthButton="w-[150px]"
              bgButton="bg-colorPrimary"
              bgButtonHover="hover:bg-colorPrimary/90"
              text="Guardar"
              textSize="text-[13px]"
              type="submit"
              textWeight="font-semibold"
              textColor="text-colorText"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ModalUploadVotantes;
