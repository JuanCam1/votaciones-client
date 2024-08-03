import { FaCirclePlus } from "react-icons/fa6";
import styles from "./ButtonCreate.module.css";

const ButtonCreate = ({ goToCreate, text }) => {
  return (
    <button onClick={goToCreate} className={styles.boton}>
      <FaCirclePlus />
      <span>{text}</span>
    </button>
  );
};
export default ButtonCreate;
