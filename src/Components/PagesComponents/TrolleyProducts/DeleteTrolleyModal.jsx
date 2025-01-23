import { useCart } from "../../../Context/CartContext.jsx";

export const DeleteTrolleyModal = ({ id }) => {
  const { removeFromCart } = useCart();

  return (
    <div>
      <button className="delete-btn-cart" onClick={() => removeFromCart(id)}>
        <img
          className="delete-icon"
          src="/Icons/close_small_35dp_434343_FILL0_wght400_GRAD0_opsz40.svg"
          alt="Borrar producto"
        />
      </button>
    </div>
  );
};
