import { useEffect, useState } from "react";
import { useRole } from "../../Context/AutContext.jsx";
import { ProfileNav } from "../Profile/ProfileNav.jsx";
import { ShoppingCart } from "../Cart/ShoppingCart.jsx";
import "./Header.css";
import { NavbarCustomer } from "../CustomerMenu/NavbarCustomer.jsx";
import { NavbarAdmin } from "../AdminMenu/NavbarAdmin.jsx";

export const Header = () => {
  const role = useRole();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1026);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para abrir o cerrar el menú de hamburguesa
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCartOpen(false); // Cierra el carrito cuando se abre el menú
    setIsProfileOpen(false); // Cierra el perfil cuando se abre el menú
  };

  // Detectar el tamaño de la pantalla y ajustar el estado 'isMobile'
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1026);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // Controlar el overflow del cuerpo del documento cuando se abre el menú móvil
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen, isMobile]);

  // Añadir clases condicionalmente para manejar la visibilidad de menús
  const addMenuOpen = isMenuOpen ? "openMenu" : "";
  const addClassMenu = isMenuOpen ? "visible" : "";

  return (
    <header className="header">
      <a href="/">
        <p className="logo">Luneva Shop</p>
      </a>
      <label className="hamburger" htmlFor="menuToggle">
        <div className="menu">
          <ProfileNav
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
            setIsCartOpen={setIsCartOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
          <ShoppingCart
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            setIsProfileOpen={setIsProfileOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
        <input
          type="checkbox"
          id="menuToggle"
          checked={isMenuOpen}
          onChange={toggleMenu}
          className={`closeMenu ${addMenuOpen}`}
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </label>
      <nav className={`nav ${addClassMenu}`}>
        <ul className="navList">
          {role === "admin" && <NavbarAdmin toggleMenu={toggleMenu} />}
          <NavbarCustomer toggleMenu={toggleMenu} />
          <div className="menuScreen">
            <ProfileNav
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
              setIsCartOpen={setIsCartOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
            <ShoppingCart
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              setIsProfileOpen={setIsProfileOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </ul>
      </nav>
    </header>
  );
};
