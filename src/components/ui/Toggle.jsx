import { useState } from "react";
import { NotificationError, NotificationSucces } from "../../utilities";

const Toggle = ({ state, id, handleToggleChange }) => {
  const isChecked = state === 1;
  const [checked, setChecked] = useState(isChecked);
  const [loadingChecked, setLoadingChecked] = useState(false);

  const handleCheckboxChange = async () => {
    if (loadingChecked) return;
    setLoadingChecked(true);
    const prevChecked = checked;
    setChecked(!checked);

    try {
      const response = await handleToggleChange(id);

      if (response === undefined || response.status === 500 || response.status === 404) {
        throw new Error("No se pudo actualizar el estado");
      }
    } catch (error) {
      NotificationError("No se ha podido actualizar");
      setTimeout(() => {
        setChecked(prevChecked);
      }, 1000);
    } finally {
      setTimeout(() => {
        setLoadingChecked(false);
      }, 1000);
    }
    NotificationSucces("Actualizado");
  };

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          checked={checked}
          disabled={loadingChecked}
          onChange={handleCheckboxChange}
          type="checkbox"
          className="sr-only peer"
        />
        <div
          className={`relative w-8 h-4 bg-colorPrimary/30 peer-focus:outline-none peer-focus:ring-2 dark:peer-focus:ring-0 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all  peer-checked:bg-colorSecundary
          ${loadingChecked ? "peer-checked:bg-colorSecundary/45 cursor-not-allowed" : null} `}
        ></div>
      </label>
    </>
  );
};
export default Toggle;
