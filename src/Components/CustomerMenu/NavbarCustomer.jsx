import { NavLinks } from "../NavLinks/NavLinks.jsx";

export const NavbarCustomer = ({ toggleMenu }) => {
  return (
    <>
      <NavLinks className="link" name="HOME" url="/" onClick={toggleMenu} />
      <NavLinks
        className="link"
        name="OFERTAS"
        url="/offers"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="PRODUCTOS"
        url="/products"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="REGISTRARSE"
        url="/register"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="LOGIN"
        url="/login"
        onClick={toggleMenu}
      />
    </>
  );
};
