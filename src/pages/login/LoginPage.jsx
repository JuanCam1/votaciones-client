import { LoginSection } from "../../sections";
import logo from "../../assets/statics/logo.webp";
import { SiOpencontainersinitiative } from "react-icons/si";
import { Link } from "react-router-dom";
import { pathsRoutes } from "../../routers/pathsRoutes";
const LoginPage = () => {
  return (
    <section className="font-Montserrat relative h-full flex justify-center items-center bg-fondo bg-no-repeat bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      <div className="absolute top-5 left-0 z-10 h-20 w-52 max-md:w-24 overflow-hidden flex items-center ">
        <img src={logo} className="w-full h-full object-scale-down" />
      </div>
      <Link
        to={`/${pathsRoutes.VOTACION}`}
        className="absolute top-5 right-5 z-10 max-md:w-24 cursor-pointer overflow-hidden p-2 border-b-2 border-transparent transition-all duration-300 ease-in-out hover:border-white"
      >
        <span className="text-white  flex items-center gap-3 font-semibold ">
          <SiOpencontainersinitiative />
          Inicio
        </span>
      </Link>

      <article className="bg-colorBox border flex flex-col p-6 relative z-10 rounded-md shadow-md md:w-[450px] lg:w-[400px] max-md:w-full max-md:py-8 ">
        <div>
          <div className="flex flex-col items-center gap-5 mb-8">
            <h2 className="md:text-xl lg:text-[14px] italic text-center font-semibold text-colorSecundary">
              SISTEMA INTEGRAL DE INFORMACIÓN ELECTORAL
            </h2>
          </div>

          <div className="mb-8">
            <h2 className="text-center font-extrabold text-2xl text-colorSecundary">Bienvenido!</h2>
            <p className="text-colorSecundary text-center font-semibold text-[18px] mb-1">
              Inicie sesión con tu cuenta
            </p>
            <p className="text-color757575 text-xs text-center">
              Por favor ingresa tus credenciales para ingresar
            </p>
          </div>
        </div>

        <LoginSection />
      </article>
    </section>
  );
};

export default LoginPage;
