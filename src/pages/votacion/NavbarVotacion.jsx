import logo from "../../assets/statics/logoHome.webp";
const NavbarVotacion = () => {
  return (
    <nav className="h-24 pl-8 flex items-center gap-6 border-b-2 max-md:h-16">
        <img src={logo} alt="Logo " className="h-20 max-md:h-10" />
        <h2 className="uppercase font-semibold text-lg text-colorSecundary max-md:text-sm">
          sistema integral de información electoral
        </h2>
      </nav>
  )
}
export default NavbarVotacion