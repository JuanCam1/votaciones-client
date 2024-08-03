import { MdFileDownload } from "react-icons/md";
import styles from "./ButtonCreate.module.css";

const ButtonExport = ({ downloadExcel }) => {
  return (
    <button
      onClick={downloadExcel}
      className={styles.boton3}
    >
      <MdFileDownload />
      <span>Exportar</span>
    </button>
  );
};
export default ButtonExport;
