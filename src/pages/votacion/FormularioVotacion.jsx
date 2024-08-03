import { forwardRef } from "react";
import { ButtonCustom, InputCustom } from "../../components";
import { NotificationError, NotificationWarning } from "../../utilities";
import { isAfter, parse } from "date-fns";
import { getVotanteByCedulaFecha } from "../../services";
import { MdDeleteForever } from "react-icons/md";

const FormularioVotacion = forwardRef(function FormularioVotacion(
  { handleReset, nameVotante, setNameVotante, isValidate, setIdVotante, setIsModal, setIsValidate },
  ref
) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fecha_expedicion_votante, cedula_votante } = e.target;

    if (fecha_expedicion_votante.value === "" || cedula_votante.value === "") {
      NotificationError("Por favor ingrese fecha de expedición y número de documento");
      return;
    }

    const dateFormat = "yyyy-MM-dd";
    const fechaExpedicion = parse(fecha_expedicion_votante.value, dateFormat, new Date());
    const dateCurrent = new Date();

    if (isAfter(fechaExpedicion, dateCurrent)) {
      NotificationError("La fechas no pueden ser superiores a la fecha actual");
      return;
    }
    const payload = {
      fecha_expedicion_votante: fecha_expedicion_votante.value,
      cedula_votante: cedula_votante.value
    };

    try {
      await getVotanteByCedulaFecha(payload).then((res) => {
        if (res.status === 200) {
          setNameVotante(res.data.data.nombre_completo);
          setIdVotante(res.data.data.id_votante);
          setTimeout(() => {
            setIsModal(true);
          }, 2000);
        } else {
          NotificationError("Error al ingresar");
          return;
        }
      });
    } catch (error) {
      if (!error.response) {
        NotificationError("Error al ingresar");
        return;
      }

      if (error.response.data.error.message === "Votante no exist") {
        setNameVotante("");
        setIdVotante("");
        setIsValidate([]);
        NotificationWarning("Votante no encontrado");
        return;
      }
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="mt-12 w-[70%] max-md:w-full border shadow-md grid grid-cols-2 gap-x-4 relative max-md:grid-cols-1 pt-6 px-4 pb-4"
    >
      <div className="cursor-pointer absolute right-2 top-2 text-red-400 w-6" onClick={handleReset}>
        <MdDeleteForever className="w-6" />
      </div>

      <div className=" max-md:col-span-3">
        <div className="mb-4">
          <label htmlFor="fecha_expedicion_votante" className="text-xs font-bold">
            Fecha De Expedición
          </label>

          <InputCustom type="date" name="fecha_expedicion_votante" id="fecha_expedicion_votante" />
        </div>
      </div>

      <div className="max-md:col-span-3">
        <div className="mb-4">
          <label htmlFor="cedula_votante" className="text-xs font-bold">
            Número de Documento
          </label>

          <InputCustom name="cedula_votante" id="cedula_votante" />
        </div>
      </div>

      <div className="col-span-2 max-md:col-span-3">
        <div className="mb-4">
          <label className="text-xs font-bold">Nombre completo</label>

          <InputCustom disabled defaultValue={nameVotante} classStyle={"cursor-not-allowed"} />
        </div>
      </div>
      <div className="col-span-2 mt-6 flex justify-end max-md:col-span-3 max-md:justify-center">
        <ButtonCustom
          disabled={isValidate.length > 0}
          widthButton="w-[150px] max-md:w-full"
          bgButton="bg-colorPrimary"
          bgButtonHover="hover:bg-colorPrimary/90"
          text="Ingresar"
          textWeight="font-bold"
          textColor="text-colorText"
          textSize="text-[13px]"
          type="submit"
        />
      </div>
    </form>
  );
});

export default FormularioVotacion;
