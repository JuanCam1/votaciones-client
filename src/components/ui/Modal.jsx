import classNames from "classnames";
import { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

const Modal = ({
  hasCloseBtn = true,
  isOpen,
  onClose,
  children,
  titulo = "Alerta",
  mostrarHeader,
  mostrarOverlay,
  posicionModal,
  padding,
  heighModal="max-h-[90vh]",
  widthModal
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const modalBodyClass = classNames(
    "bg-white relative rounded-md shadow-sm overflow-y-auto", 
    padding,
    heighModal,
    widthModal
  );

  return (
    <div
      className={`
        w-screen h-screen fixed top-0 left-0 p-5 flex justify-center items-center shadow-md border z-40
          ${mostrarOverlay ? "bg-gray-200 bg-opacity-70" : "bg-black bg-opacity-50"}
          ${posicionModal === "center" ? posicionModal : "items-start"};
        `}
    >
      <div className={modalBodyClass}>
        {mostrarHeader && (
          <div className="flex flex-row justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-colorSecundary capitalize">{titulo}</h3>
            </div>

            <button
              className={`
                    size-8 border-none bg-none cursor-pointer transition ease-in-out duration-300 rounded-[5px] 
                    ${hasCloseBtn ? "block" : "hidden"}
                    `}
              onClick={onClose}
            >
              <IoCloseCircle className="size-full text-colorPrimary/90 hover:text-colorPrimary" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
