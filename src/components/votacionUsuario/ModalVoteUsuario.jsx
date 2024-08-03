import { useEffect, useState } from "react";
import {
  createVotoUsuario,
  eleccionesIsUsuario,
  getEleccionCandidatoByIdEleccionAll
} from "../../services";
import userImage from "../../assets/statics/no-user.webp";
import { format } from "date-fns";
import { formatTime, instance, NotificationError, NotificationSucces } from "../../utilities";
import ButtonCustom from "../ui/ButtonCustom";
import Modal from "../ui/Modal";
import { es } from "date-fns/locale";

const ModalVoteUsuario = ({ setIsValidate, selected, idUsuario, isOpen, onClose }) => {
  const [candidatos, setCandidatos] = useState([]);
  const [loadingCandidatos, setLoadingCandidatos] = useState(false);
  if (Object.values(selected).includes("") || Object.values(selected).includes(undefined)) {
    onClose();
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoadingCandidatos(true);
      try {
        const { data } = await getEleccionCandidatoByIdEleccionAll(selected.eleccion_id, "Activo");
        setCandidatos(data.data);
      } catch (error) {
        NotificationError("Error al cargar los candidatos");
      } finally {
        setLoadingCandidatos(false);
      }
    };
    fetchData();
  }, [selected]);

  const pathUrl = import.meta.env.VITE_API_URL + "/candidato/getImage/";
  const [candidatoImages, setCandidatoImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const candidato of candidatos) {
        if (candidato.foto_candidato !== "sinphoto.jpg") {
          try {
            const { data } = await instance.get(pathUrl + candidato.foto_candidato, {
              responseType: "blob"
            });
            images[candidato.candidato_id] = URL.createObjectURL(data);
          } catch (error) {
            NotificationError("Error al cargar las fotos");
          }
        }
      }
      setCandidatoImages(images);
    };
    fetchImages();
  }, [pathUrl, candidatos]);

  const [selectedCandidate, setSelectedCandidate] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const currentDate = format(now, "yyyy-MM-dd");
    const currentTime = format(now, "HH:mm");

    let candidato_id = null;
    let voto_blanco = 0;
    if (selectedCandidate === 0) {
      voto_blanco = 1;
    } else {
      candidato_id = selectedCandidate;
    }

    const payload = {
      id_eleccion_usuario: selected.id_eleccion_usuario,
      candidato_id: candidato_id,
      eleccion_id: selected.eleccion_id,
      usuario_id: idUsuario,
      fecha_voto: currentDate,
      hora_voto: currentTime,
      voto_blanco: voto_blanco
    };

    try {
      await createVotoUsuario(payload).then(async (res) => {
        if (res.status === 202) {
          NotificationSucces("Ha votado Correctamente");

          await eleccionesIsUsuario(idUsuario).then((res) => {
            if (res.status === 202) {
              setIsValidate(res.data.data);
              onClose();
              return;
            }
          });
          return;
        }
      });
    } catch (error) {
      NotificationError("Error al votar");
    }
  };

  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
      titulo={selected.nombre_eleccion}
      mostrarHeader={true}
      mostrarOverlay={true}
      posicionModal={"center"}
      padding={"p-5"}
      heighModal={"h-auto"}
      widthModal={"w-auto  min-w-[900px]"}
    >
      <div className="border shadow-md p-3 rounded-md">
        <div className="flex flex-col justify-center items-center py-3">
          <p className="text-pretty">{selected.descripcion_eleccion}</p>
          <p>
            {`Fecha Finalización: ${format(
              new Date(selected.fecha_fin_eleccion),
              "d 'de' MMMM 'de' yyyy",
              { locale: es }
            )}`}
            {"-"}
            {formatTime(selected.hora_fin_eleccion)}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div
            onClick={() => setSelectedCandidate(0)}
            className={`h-[200px] w-[150px] block shadow-md  hover:bg-gray-200  cursor-pointer border-2 p-4 rounded ${
              selectedCandidate === 0 ? "border-gray-800 bg-gray-200" : "border-gray-300"
            }`}
          >
            Voto en Blanco
          </div>

          {loadingCandidatos ? (
            <>
              <div className="h-[200px] w-[150px] block shadow-md  hover:bg-gray-200  cursor-pointer border-2 p-4 rounded">
                <div className="flex flex-col items-center w-full gap-2">
                  <img src={userImage} alt={`Foto candidato`} className="w-full h-full" />

                  <span className="text-xs font-semibold text-center">candidato</span>
                </div>
              </div>
              <div className="h-[200px] w-[150px] block shadow-md  hover:bg-gray-200  cursor-pointer border-2 p-4 rounded">
                <div className="flex flex-col items-center w-full gap-2">
                  <img src={userImage} alt={`Foto candidato`} className="w-full h-full" />

                  <span className="text-xs font-semibold text-center">candidato</span>
                </div>
              </div>
            </>
          ) : (
            candidatos.map((candidate) => (
              <div
                key={candidate.candidato_id}
                onClick={() => setSelectedCandidate(candidate.candidato_id)}
                className={`h-[200px] w-[150px] block shadow-md  hover:bg-gray-200  cursor-pointer border-2 p-4 rounded ${
                  selectedCandidate === candidate.candidato_id
                    ? "border-gray-800 bg-gray-200"
                    : "border-gray-300"
                }`}
              >
                <div className="flex flex-col items-center w-full gap-2">
                  {candidatoImages[candidate.candidato_id] ? (
                    <img
                      className="object-cover w-full"
                      src={candidatoImages[candidate.candidato_id]}
                      alt={`Foto usuario ${candidate.nombre_candidato}`}
                    />
                  ) : (
                    <img
                      src={userImage}
                      alt={`Foto usuario ${candidate.nombre_candidato}`}
                      className="w-full h-full"
                    />
                  )}
                  <span className="text-xs font-semibold text-center">
                    {candidate.nombre_candidato}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonCustom
            onClick={handleSubmit}
            widthButton="w-[150px]"
            bgButton="bg-colorPrimary"
            bgButtonHover="hover:bg-colorPrimary/90"
            text="Votar"
            textWeight="font-bold"
            textColor="text-colorText"
            textSize="text-[13px]"
          />
        </div>
      </div>
    </Modal>
  );
};
export default ModalVoteUsuario;
