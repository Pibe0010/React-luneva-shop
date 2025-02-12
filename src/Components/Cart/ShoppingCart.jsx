import { useState } from "react";
import "./ShoppingCart.css";
import { ButtonCart } from "../Buttons/ButtonCart/ButtonCart.jsx";
import { ShoppingProducts } from "./ShoppingProducts.jsx";
import { useUser } from "../../Context/AutContext.jsx";
import { MoreTrolley } from "../PagesComponents/TrolleyProducts/MoreTrolley.jsx";
import { useCart } from "../../Context/CartContext.jsx";

export const ShoppingCart = ({
  isCartOpen,
  setIsCartOpen,
  setIsProfileOpen,
  setIsMenuOpen,
}) => {
  const token = useUser();
  const [isClicked, setIsClicked] = useState(false);
  const { cart } = useCart();

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
            <ol className="cart-product-carts">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <li key={product.ID_trolley}>
                    <ShoppingProducts
                      id={product.ID_trolley}
                      trolley={product}
                      token={token}
                    />
                  </li>
                ))
              ) : (
                <p className="nameCartNav">Carrito vacío</p>
              )}
            </ol>

            <div className="btnCart">
              <ButtonCart className="btnSell" name="Comprar" />
              <MoreTrolley trolley={cart} />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};
