import { NavIconLinks } from "../NavLinks/NavIconLinks.jsx";
import { NavLinks } from "../NavLinks/NavLinks.jsx";

export const NavbarAdmin = ({ toggleMenu }) => {
  return (
    <>
      <NavIconLinks className="link" url="/create-offer" onClick={toggleMenu}>
        <img src="/Icons/offer-svgrepo-com.svg" alt="Agregar oferta" />
      </NavIconLinks>
      <NavIconLinks className="link" url="/create-product" onClick={toggleMenu}>
        <img src="/Icons/soap-svgrepo-com.svg" alt="Agregar producto" />
      </NavIconLinks>
      <NavLinks
        className="link"
        name="ÓRDENES"
        url="/orders"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="TICKETS"
        url="/tickets"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="DIRECCIONES"
        url="/address"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="ENVÍOS"
        url="/shipment"
        onClick={toggleMenu}
      />
      <NavLinks
        className="link"
        name="PAGOS"
        url="/payment"
        onClick={toggleMenu}
      />
    </>
  );
};
