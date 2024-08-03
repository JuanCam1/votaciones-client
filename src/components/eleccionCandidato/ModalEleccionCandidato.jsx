import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { createEleccionCandidato, getCandidatosByState, getEleccionState } from "../../services";
import { NotificationError, NotificationSucces, validateStatus } from "../../utilities";
import ButtonCustom from "../ui/ButtonCustom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const ModalEleccionCandidato = ({ isOpen, onClose }) => {
  const [eleccionId, setEleccionId] = useState(0);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCandidatosByState("Activo");
        const options = data.data.map((candidato) => ({
          value: candidato.id_candidato,
          label: `${candidato.nombre_candidato} - ${candidato.cedula_candidato}`
        }));
        setStateOptions(options);
      } catch (error) {
        NotificationError("Error al cargar los candidatos");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (selectedCandidates.length > 0) {
      const payload = {
        eleccion_id: eleccionId,
        candidatos_id: selectedCandidates.at(-1).map((selected) => selected.value),
        estado_id: 1
      };
      try {
        await createEleccionCandidato(payload).then((res) => {
          if (validateStatus(res.status)) {
            throw Error();
          } else {
            NotificationSucces("Candidatos agregados correctamente");
            setTimeout(() => {
              onClose();
            }, 2000);
          }
        });
      } catch (error) {
        NotificationError("Error al agregar los usuarios");
      }
    }
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={"Agregar Candidatos"}
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

          <div className="col-span-2">
            {stateOptions.length > 0 && (
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={stateOptions}
                onChange={(selected) => {
                  setSelectedCandidates((prev) => [...prev, selected]);
                }}
              />
            )}
          </div>
          <div className="mt-6 flex justify-end col-span-2 h-[40px]">
            <ButtonCustom
              widthButton="w-[150px]"
              bgButton="bg-colorPrimary"
              bgButtonHover="hover:bg-colorPrimary/90"
              text="Guardar"
              textWeight="font-bold"
              textColor="text-colorText"
              textSize="text-[13px]"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEleccionCandidato;
