import { useEffect, useRef, useState } from "react";
import "./ProductCardPage.css";
import defaultProduct from "/Icons/imageProduct.svg";

const URL = import.meta.env.VITE_URL;

export const ProductCardPage = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Verificamos si las propiedades de imagen están definidas y las filtramos
  const images = [
    product.image_one,
    product.image_two,
    product.image_tree,
  ].filter((image) => image != null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      handleNextProduct();
    }, 10000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const handleNextProduct = () => {
    if (!isPaused) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProduct((prevProduct) => (prevProduct + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const image = images.length > 0 ? images[currentProduct] : null;

  const handleAddToCart = () => {
    console.log("Producto añadido al carrito");
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => {
        setIsPaused(true);
        stopTimer();
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        startTimer();
      }}
    >
      <div className="productPage-image">
        <div className="productPage-stock">{product.Stock} u</div>
        <img
          className={`productPage-image ${
            isTransitioning ? "slide-out" : "slide-in"
          }`}
          src={
            image
              ? `${URL}/uploads/products/${product.ID_product}/${image}`
              : defaultProduct
          }
          alt={product.name}
        />
      </div>
      <div className="productPage-info">
        <h3>Jabón de {product.name}</h3>
        <p>{product.description}</p>
        <div className="quantity-selector">
          <label htmlFor="quantity">Cantidad</label>
          <input id="quantity" type="number" defaultValue="1" min="1" />
          <p className="productPage-price">{product.price} €</p>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};