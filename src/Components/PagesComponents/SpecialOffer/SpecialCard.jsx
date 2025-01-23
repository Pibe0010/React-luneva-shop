import { useState } from "react";
import { useCart } from "../../../Context/CartContext.jsx";
import { Timer } from "../Home/Timer.jsx";
import "./SpecialCard.css";
import defaultProduct from "/Icons/imageProduct.svg";
import { newTrolleySchema } from "../../../Schema/Error/CreateSchema.js";
const URL = import.meta.env.VITE_URL;
export const SpecialCard = ({ products, id }) => {
  const { addToCart, addProduct } = useCart();
  const [products_amount, setProducts_amount] = useState("1");

  const handleAddToCart = async (data) => {
    await addToCart(data, addProduct);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = { ID_product: id, products_amount };

    // Validar los datos con Joi
    const { error } = newTrolleySchema.validate(data);

    // Si hay un error, lo establecemos
    if (error) {
      console.log(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handleAddToCart(data);
  };

  return (
    <section className="special-card" key={products.ID_Product}>
      <div className="special-card-container">
        <div className="special-offer ">
          <img
            src={
              products.image_one
                ? `${URL}/uploads/products/${products.ID_Product}/${products.image_one}`
                : defaultProduct
            }
            alt={`Jabón de ${products.name}`}
            className="special-card-image"
          />
          <div className="special-card-content">
            <h2 className="special-card-title">Jabòn de {products.name}</h2>
            <p className="special-card-description">{products.description}</p>
            <div className="special-card-prices">
              <span className="special-card-price-current">
                {products.price} €
              </span>
              <span className="special-card-price-discounted">
                Descuento: {products.discount_rate} €
              </span>
            </div>
            <form className="special-card-form" onSubmit={handleSubmit}>
              <input
                className="special-card-input"
                id="quantity"
                type="number"
                defaultValue="1"
                min="1"
                onChange={(e) => setProducts_amount(e.target.value)}
              />

              <Timer endTime={products} />
              <button className="special-card-button">Añadir al carrito</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
