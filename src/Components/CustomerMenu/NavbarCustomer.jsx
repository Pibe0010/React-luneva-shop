import { useEffect, useState } from "react";
import { useRole } from "../../Context/AutContext.jsx";
import { NavLinks } from "../NavLinks/NavLinks.jsx";

export const NavbarCustomer = ({ toggleMenu }) => {
  const role = useRole();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!role);
  }, [role]);

  return (
    <>
      <NavLinks className="link" name="HOME" url="/" onClick={toggleMenu} />
      <NavLinks
        className="link"
        name="OFERTAS"
        url="/special-offers"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="PRODUCTOS"
        url="/products"
        onClick={toggleMenu}
      />
      {!isLogged && (
        <NavLinks
          className="link"
          name="REGISTRARSE"
          url="/register"
          onClick={toggleMenu}
        />
      )}
      <NavLinks
        className="link"
        name="LOGIN"
        url="/login"
        onClick={toggleMenu}
      />
    </>
  );
};
