import { useState } from "react";
import "./ShoppingCart.css";
import { ButtonCart } from "../Buttons/ButtonCart/ButtonCart.jsx";

export const ShoppingCart = ({
  isCartOpen,
  setIsCartOpen,
  setIsProfileOpen,
  setIsMenuOpen,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleDropdown = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) {
      setIsProfileOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };
  return (
    <nav className="cartNavContainer">
      <button
        className={`dropdown-toggle btn-cart ${isCartOpen ? "open" : ""} ${isClicked ? "clicked" : ""}`}
        onClick={() => {
          toggleDropdown();
          handleClick();
        }}
      >
        <img
          className="cartNav"
          src="/Icons/shopping-cart-free-15-svgrepo-com.svg"
          alt="Imagen de carrito de compras"
        />
      </button>

      <ul className={`menuCartNav ${isCartOpen ? "open" : ""}`}>
        <li className="nameCart navCartli navCartLink" key="nameCart">
          <div className="btnCart-container">
            <p className="nameCartNav"> Carrito vacio</p>
            <div className="btnCart">
              <ButtonCart className="btnSell" name="Comprar" />
              <ButtonCart className="btnClear" name="Vaciar " />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};
