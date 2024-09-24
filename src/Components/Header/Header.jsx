import { useEffect, useState } from "react";
import { useRole } from "../../Context/AutContext.jsx";
import "./Header.css";
import { NavLinks } from "../NavLinks/NavLinks.jsx";
import { ProfileNav } from "../Profile/ProfileNav.jsx";
import { ShoppingCart } from "../Cart/ShoppingCart.jsx";

export const Header = () => {
  const role = useRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1026);

  // Funcion para abrir el menu hamburgesa
  const openMenuToggle = () => {
    setMenuOpen((old) => !old);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1026);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen, isMobile]);

  const addMenuOpen = menuOpen ? "openMenu" : "";
  const addClassMenu = menuOpen ? "visible" : "";

  return (
    <header className="header">
      <a href="/">
        <img className="logo" src="/img/logo.png" alt="Logo luneva shop" />
      </a>
      <label className="hamburger" htmlFor="menuToggle">
        <input
          type="checkbox"
          id="menuToggle"
          className={`closeMenu ${addMenuOpen}`}
          onClick={openMenuToggle}
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
          <NavLinks
            className="link"
            name="OFERTAS"
            url="/offers"
            onClick={openMenuToggle}
          />
          <NavLinks
            className="link"
            name="PRODUCTOS"
            url="/products"
            onClick={openMenuToggle}
          />
          <NavLinks
            className="link"
            name="LOGIN"
            url="/login"
            onClick={openMenuToggle}
          />
          <NavLinks
            className="link"
            name="REGISTRARSE"
            url="/register"
            onClick={openMenuToggle}
          />
          {role === "admin" && <></>}
          <ProfileNav />
          <ShoppingCart />
        </ul>
      </nav>
    </header>
  );
};
