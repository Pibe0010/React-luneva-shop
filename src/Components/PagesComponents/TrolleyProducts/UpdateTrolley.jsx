import "./Updatetrolley.css";
export const UpdateTrolley = ({ trolleyData }) => {
  return (
    <label htmlFor="cartQuantity">
      <input
        id="cartQuantity"
        className="cart-product-update"
        type="number"
        defaultValue={trolleyData}
        min="1"
      />{" "}
      Cantidad
    </label>
  );
};
