import { useCart } from "../../../Context/CartContext.jsx";
import "./DeleteProductCart.css";

export const DeleteProductCart = ({ id }) => {
  const { removeFromCart } = useCart();

  return (
    <div>
      <button className="cartPage-delete " onClick={() => removeFromCart(id)}>
        Eliminar
      </button>
    </div>
  );
};
