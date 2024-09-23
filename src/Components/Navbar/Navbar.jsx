import { NavLink } from "react-router-dom";
import { useRole } from "../../Context/AutContext.jsx";

export const Navbar = () => {
  const role = useRole();

  return (
    <header className="header">
      <nav className="nav">
        <div>
          <NavLink to="/" className="logo">
            <p>Luneva Shop</p>
          </NavLink>
          <NavLink to="/offers">OFERTAS</NavLink>
          <NavLink to="/Products">JABONES</NavLink>
          <NavLink to="/login">LOGIN</NavLink>
          <NavLink to="/register">REGISTRARSE</NavLink>
          <NavLink to="/trolley">
            <NavLink to="/profile">
              <img
                className="profile"
                src="/public/Icons/ProfileGood.svg"
                alt="profile"
              />
            </NavLink>
            <img
              className="cart"
              src="/public/Icons/shopping-cart-free-15-svgrepo-com.svg"
              alt="cart"
            />
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink to="/orders">ORDENES</NavLink>
              <NavLink to="/insert-product">PODUCTOS</NavLink>
              <NavLink to="/insert-offert">OFERTAS</NavLink>
              <NavLink to="/insert-product">PODUCTOS</NavLink>
              <NavLink to="/payments">PAGOS</NavLink>
              <NavLink to="/shipments">ENVIOS</NavLink>
              <NavLink to="/tickets">TICKETS</NavLink>
              <NavLink to="/address">DIRECCIONES</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
