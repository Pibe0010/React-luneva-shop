import { useEffect, useState, useRef } from "react";
import defaultProduct from "/Icons/imageProduct.svg";
import { Timer } from "./Timer.jsx";
import { Loader } from "../../Animations/Loader.jsx";
import { useCart } from "../../../Context/CartContext.jsx";
import { newTrolleySchema } from "../../../Schema/Error/CreateSchema.js";
const URL = import.meta.env.VITE_URL;

export const Futuredproduct = ({ products }) => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [products_amount, setProducts_amount] = useState("1");
  const intervalRef = useRef(null);
  const { addToCart, addProduct } = useCart();

  const handleAddToCart = async (data) => {
    await addToCart(data, addProduct);
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      handleNextProduct();
    }, 8000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isPaused) startTimer();

    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length, isPaused]);

  const handleNextProduct = () => {
    if (!isPaused) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProduct((prevProduct) => (prevProduct + 1) % products.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const product =
    products && products.length > 0 ? products[currentProduct] : null;

  if (!product) {
    return (
      <section className="featured-products">
        <h2 className="home-offer-title">Ofertas Especiales</h2>
        <div
          className="card-container-home"
          onMouseEnter={() => {
            setIsPaused(true);
            stopTimer();
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            startTimer();
          }}
        >
          <div className="not-found-offer">
            <Loader />
          </div>
        </div>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = { ID_product: product.ID_Product, products_amount };

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
    <section className="featured-products">
      <h2 className="home-offer-title">Ofertas Especiales</h2>
      <div
        className="card-container-home"
        onMouseEnter={() => {
          setIsPaused(true);
          stopTimer();
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          startTimer();
        }}
      >
        <div
          className={`home-offer-card ${
            isTransitioning ? "slide-out" : "slide-in"
          }`}
        >
          <img
            src={
              product.image_one
                ? `${URL}/uploads/products/${product.ID_Product}/${product.image_one}`
                : defaultProduct
            }
            alt={`Jabón de ${product.name}`}
            className="home-offer-image"
          />
          <div className="home-offer-content">
            <h2 className="home-card-title">Jabòn de {product.name}</h2>
            <p className="home-offer-description">{product.description}</p>
            <div className="home-offer-prices">
              <span className="home-offer-price-current">
                {product.price} €
              </span>
              <span className="home-offer-price-discounted">
                Descuento: {product.discount_rate} €
              </span>
            </div>
            <form className="home-card-form" onSubmit={handleSubmit}>
              <input
                className="home-card-input"
                id="quantity"
                type="number"
                defaultValue="1"
                min="1"
                onChange={(e) => setProducts_amount(e.target.value)}
              />
              <Timer endTime={product} />
              <button className="home-offer-button">Añadir al carrito</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
