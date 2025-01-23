const URL = import.meta.env.VITE_URL;
import { DeleteTrolleyModal } from "../PagesComponents/TrolleyProducts/DeleteTrolleyModal.jsx";
import "./ShoppingProducts.css";

export const ShoppingProducts = ({ trolley, deleteTrolley, token }) => {
  return (
    <section className="cart-product-container">
      <ol>
        <li>
          <div className="cart-product-card">
            <div className="cart-product-img">
              <img
                src={`${URL}/uploads/products/${trolley.ID_product}/${trolley.image_one}`}
                alt="Imagen de jabòn"
              />
            </div>
            <div className="cart-product-data">
              <p>Jabòn de {trolley.name}</p>
              <p className="cart-product-update">
                Cantidad: {trolley.products_amount}
              </p>
              <p>{trolley.price} €</p>
            </div>

            <div className="cart-actions-products">
              <DeleteTrolleyModal
                id={trolley.ID_product}
                onDelete={deleteTrolley}
                token={token}
              />
            </div>
          </div>
        </li>
      </ol>
    </section>
  );
};
