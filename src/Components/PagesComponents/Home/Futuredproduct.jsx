import { useEffect, useState, useRef } from "react";
import defaultProduct from "/Icons/imageProduct.svg";
import { Timer } from "./Timer.jsx";
const URL = import.meta.env.VITE_URL;

export const Futuredproduct = ({ products }) => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

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
    return <p>Product not available..</p>;
  }

  const handleAddToCart = () => {
    console.log("Producto añadido al carrito");
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
            <h2 className="home-card-title">{product.name}</h2>
            <p className="home-offer-description">{product.description}</p>
            <div className="home-offer-prices">
              <span className="home-offer-price-current">
                {product.price} €
              </span>
              <span className="home-offer-price-discounted">
                Descuento: {product.discount_rate} €
              </span>
            </div>
            <Timer endTime={product} />
            <button className="home-offer-button" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
