/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { instance } from "../../utilities";
import noUserImage from "../../assets/statics/no-user.webp";
import escudoLogo from "../../assets/statics/escudo.webp";
import ModalUserNavbar from "../usuario/ModalUsuarioNavbar";

const Navbar = () => {
  const [userImage, setUserImage] = useState(noUserImage);
  const [isModalOpen, setModalOpen] = useState(false);

  const userIdPayload = useAuthStore((state) => state.dataUser?.id_usuario || "0");
  const userName = useAuthStore((state) => state.dataUser?.nombre_usuario || "No user");
  const photoPayload = useAuthStore((state) => state.dataUser?.foto_usuario || "sinphoto.jpg");
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");
  const pathUrl = import.meta.env.VITE_API_URL + "/usuario/getImage/";

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (photoPayload !== "sinphoto.jpg") {
        try {
          const { data } = await instance.get(pathUrl + photoPayload, {
            responseType: "blob"
          });
          setUserImage(URL.createObjectURL(data));
        } catch (error) {
          setUserImage(noUserImage);
        }
      }
    };

    fetchImage();
  }, []);

  const handelClick = (ref) => {
    if (ref.current.style.maxHeight) {
      ref.current.style.maxHeight = null;
    } else {
      ref.current.style.maxHeight = ref.current.scrollHeight + "px";
    }
  };
  return (
    <header className="h-16 fixed bg-white w-full border-b z-30">
      <nav className="flex pr-8 pl-7 max-md:px-2 py-2 justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-18 max-md:w-24 overflow-hidden flex items-center p-1">
            <img src={escudoLogo} className="size-full" alt="logo" />
          </div>
          <div className="h-full w-[0.5px] bg-gray-200 py-3"></div>
          <h2 className="text-colorSecundary text-lg font-Montserrat font-bold max-md:text-xs lg:text-lg">
            SISTEMA INTEGRAL DE INFORMACIÓN ELECTORAL
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-colorSecundary font-Montserrat text-xs font-semibold max-md:hidden">
            {userName}
          </h2>
          <ItemDropdown
            setModalOpen={setModalOpen}
            handelClick={handelClick}
            userImage={userImage}
            profilePayload={profilePayload}
          />
        </div>
      </nav>
      {isModalOpen && (
        <ModalUserNavbar
          userIdPayload={userIdPayload}
          userName={userName}
          photoUser={userImage}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </header>
  );
};

const ItemDropdown = ({ setModalOpen, handelClick, userImage, profilePayload }) => {
  const logout = useAuthStore((state) => state.logoutUser);
  const navigate = useNavigate();
  const divRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handelClick2 = () => {
    setIsOpen(!isOpen);
    handelClick(divRef);
  };

  const onOpenModalUser = () => {
    setModalOpen(true);
    handelClick2();
  };

  const onLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="relative font-Montserrat">
      <div className="size-8 overflow-hidden rounded-full cursor-pointer" onClick={handelClick2}>
        <img src={userImage} alt="logo navbar" className=" size-full" />
      </div>
      <div
        ref={divRef}
        className={`transition-max-height duration-300 ease-out h-64 max-h-0 absolute overflow-hidden right-0 mt-1 w-56 origin-top-right rounded-md bg-white  focus:outline-none
          ${isOpen ? "border shadow-lg ring-black ring-opacity-5 z-20" : null}
          `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div role="none">
          <span
            className="block px-4 py-2 text-sm text-gray-700 font-semibold"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            {profilePayload}
          </span>
          <button
            onClick={onOpenModalUser}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-colorPrimary/30 w-full text-left"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-1"
          >
            Perfil
          </button>
          <button
            onClick={onLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-colorPrimary/30 w-full text-left"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-2"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
