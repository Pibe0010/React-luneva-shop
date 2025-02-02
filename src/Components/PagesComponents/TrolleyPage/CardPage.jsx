import { DeleteProductCart } from "./DeleteProductCart.jsx";

const URL = import.meta.env.VITE_URL;

export const CardPage = ({ product, token }) => {
  const imageUrl = `${URL}/uploads/products/${product.ID_product}/${product.image_one}`;

  const discount =
    product.product_discount !== null ? `${product.product_discount} €` : "0 €";

  return (
    <li key={product.ID_trolley} className="cartPage-card">
      <img src={imageUrl} alt="Foto de jabón" className="cartPage-img" />
      <div className="cartPage-data">
        <h2 className="cartPage-name">Jabón de {product.name}</h2>
        <p>Precio: {product.price} €</p>
        <p>Cantidad: {product.products_amount} uds</p>
        <p>Descuento: {discount} </p>
        <div className="cartPage-card-actions">
          <DeleteProductCart id={product.ID_product} token={token} />
        </div>
      </div>
    </li>
  );
};
