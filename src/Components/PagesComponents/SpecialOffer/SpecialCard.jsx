import { Timer } from "../Home/Timer.jsx";
import "./SpecialCard.css";
import defaultProduct from "/Icons/imageProduct.svg";
const URL = import.meta.env.VITE_URL;
export const SpecialCard = ({ products, addToCart }) => {
  return (
    <>
      {products.map((product) => (
        <section className="special-card" key={product.ID_Product}>
          <div className="special-card-container">
            <div className="special-offer ">
              <img
                src={
                  product.image_one
                    ? `${URL}/uploads/products/${product.ID_Product}/${product.image_one}`
                    : defaultProduct
                }
                alt={`Jabón de ${product.name}`}
                className="special-card-image"
              />
              <div className="special-card-content">
                <h2 className="special-card-title">Jabòn de {product.name}</h2>
                <p className="special-card-description">
                  {product.description}
                </p>
                <div className="special-card-prices">
                  <span className="special-card-price-current">
                    {product.price} €
                  </span>
                  <span className="special-card-price-discounted">
                    Descuento: {product.discount_rate} €
                  </span>
                </div>
                <Timer endTime={product} />
                <button className="special-card-button" onClick={addToCart}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
