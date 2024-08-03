import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../hooks";
import controlPath from "../../assets/statics/control.webp";
import { pathsRoutes } from "../../routers/pathsRoutes";
import { FiUsers } from "react-icons/fi";
import { MdHowToVote, MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaRegCalendarAlt, FaVoteYea } from "react-icons/fa";
import { useRef, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

const Sidebar = () => {
  const { openMode, toggleOpenMode } = useSidebar();
  const { pathname } = useLocation();
  const profilePayload = useAuthStore((state) => state.dataUser?.nombre_role || "Jurado");

  const handelClick = (ref) => {
    if (ref.current.style.maxHeight) {
      ref.current.style.maxHeight = null;
    } else {
      ref.current.style.maxHeight = ref.current.scrollHeight + "px";
    }
  };
  return (
    <aside
      className={` 
        ${openMode ? "max-md:w-64" : "max-md:w-20 max-sm:w-16"} 
        mt-0 bg-colorBox fixed z-10 border-r px-5 max-sm:px-2 pt-10 duration-300
          lg:w-64 font-Montserrat font-semibold overflow-y-auto h-full pb-20 
        `}
    >
      <img
        src={controlPath}
        className={`lg:hidden absolute cursor-pointer -right-3 top-10 w-8 border-dark-purple
           border-2 rounded-full ${!openMode && "rotate-180"}`}
        onClick={toggleOpenMode}
      />
      <ItemLink to={`/dash`} path={pathname}>
        <FaVoteYea
          className={`w-5
              ${pathname === `/dash` ? "text-colorLogo" : "text-color757575"}`}
        />
        <span
          className={`${!openMode && "hidden"} 
            ${pathname === `/dash` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
        >
          Reportes
        </span>
      </ItemLink>
      <ItemLink to={`/dash/${pathsRoutes.VOTACIONUSUARIO}`} path={pathname}>
        <MdHowToVote
          className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.VOTACIONUSUARIO}`
                  ? "text-colorLogo"
                  : "text-color757575"
              }`}
        />

        <span
          className={`${!openMode && "hidden"} 
            ${pathname === `/dash/${pathsRoutes.VOTACIONUSUARIO}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
        >
          Votaciones
        </span>
      </ItemLink>

      {profilePayload !== "Jurado" && (
        <ItemDropdown
          text={profilePayload}
          handelClick={handelClick}
          pathname={pathname}
          openMode={openMode}
        />
      )}
    </aside>
  );
};

const ItemDropdown = ({ text, handelClick, pathname, openMode }) => {
  const divRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handelClick2 = () => {
    setIsOpen(!isOpen);
    handelClick(divRef);
  };
  return (
    <>
      <button
        className={`mt-2 py-2 pl-2 flex items-center gap-4 w-full text-left cursor-pointer
       transition-colors duration-500 hover:bg-colorPrimary/30 font-semibold rounded text-sm `}
        onClick={handelClick2}
      >
        {isOpen ? <IoIosArrowUp className="text-colorLogo" /> : <IoIosArrowDown />}
        {text}
      </button>
      <div
        ref={divRef}
        className="transition-max-height duration-500 ease-out h-[500px] max-h-0 overflow-hidden  px-1 flex flex-col gap-1 pt-1"
      >
        <ItemLink to={`/dash/${pathsRoutes.ELECCIONES}`} path={pathname}>
          <FaRegCalendarAlt
            className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.ELECCIONES}`
                  ? "text-colorLogo"
                  : "text-color757575"
              }`}
          />
          <span
            className={`${!openMode && "hidden"} 
            ${pathname === `/dash/${pathsRoutes.ELECCIONES}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
          >
            Elecciones
          </span>
        </ItemLink>

        <ItemLink to={`/dash/${pathsRoutes.CANDIDATOS}`} path={pathname}>
          <FiUsers
            className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.CANDIDATOS}`
                  ? "text-colorLogo"
                  : "text-color757575"
              }`}
          />
          <span
            className={`${!openMode && "hidden"} 
            ${pathname === `/dash/${pathsRoutes.CANDIDATOS}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
          >
            Candidatos
          </span>
        </ItemLink>

        <ItemLink to={`/dash/${pathsRoutes.USUARIOS}`} path={pathname}>
          <FiUsers
            className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.USUARIOS}` ? "text-colorLogo" : "text-color757575"
              }`}
          />
          <span
            className={`${!openMode && "hidden"} 
            ${pathname === `/${pathsRoutes.USUARIOS}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
          >
            Usuarios
          </span>
        </ItemLink>

        <ItemLink to={`/dash/${pathsRoutes.CARGARINFO}`} path={pathname}>
          <MdOutlineDriveFolderUpload
            className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.CARGARINFO}`
                  ? "text-colorLogo"
                  : "text-color757575"
              }`}
          />
          <span
            className={`${!openMode && "hidden"} 
            ${pathname === `/dash/${pathsRoutes.CARGARINFO}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
          >
            Cargar Votantes
          </span>
        </ItemLink>

        <ItemLink to={`/dash/${pathsRoutes.CARGARCANDIDATO}`} path={pathname}>
          <IoAddCircleOutline
            className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.CARGARCANDIDATO}`
                  ? "text-colorLogo"
                  : "text-color757575"
              }`}
          />
          <span
            className={`${!openMode && "hidden"} 
            ${pathname === `/dash/${pathsRoutes.CARGARCANDIDATO}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
          >
            Agregar Candidatos
          </span>
        </ItemLink>

        <ItemLink to={`/dash/${pathsRoutes.CARGARUSUARIO}`} path={pathname}>
          <IoAddCircleOutline
            className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.CARGARUSUARIO}`
                  ? "text-colorLogo"
                  : "text-color757575"
              }`}
          />
          <span
            className={`${!openMode && "hidden"} 
            ${pathname === `/dash/${pathsRoutes.CARGARUSUARIO}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
          >
            Agregar Usuarios
          </span>
        </ItemLink>

        <ItemLink to={`/dash/${pathsRoutes.VOTANTES}`} path={pathname}>
          <FiUsers
            className={`w-5
              ${
                pathname === `/dash/${pathsRoutes.VOTANTES}` ? "text-colorLogo" : "text-color757575"
              }`}
          />

          <span
            className={`${!openMode && "hidden"} 
            ${pathname === `/dash/${pathsRoutes.VOTANTES}` ? "font-bold" : null}
            whitespace-nowrap overflow-hidden text-ellipsis origin-left duration-200 text-black lg:block `}
          >
            Votantes
          </span>
        </ItemLink>
      </div>
    </>
  );
};

const ItemLink = ({ to, classStyle = null, path, children }) => {
  return (
    <Link
      to={to}
      className={`flex rounded-md pb-2 cursor-pointer pl-2 py-2 hover:bg-colorPrimary/30 transition-colors duration-500  text-sm items-center gap-x-4 mt-4 bg-light-white 
        ${path === to && "lg:border-r-2 lg:border-colorLogo"} ${classStyle}`}
    >
      {children}
    </Link>
  );
};

export default Sidebar;
