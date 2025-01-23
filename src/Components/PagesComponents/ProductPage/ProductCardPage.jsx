import { useEffect, useRef, useState } from "react";
import "./ProductCardPage.css";
import defaultProduct from "/Icons/imageProduct.svg";
import { newTrolleySchema } from "../../../Schema/Error/CreateSchema.js";
import { useCart } from "../../../Context/CartContext.jsx";

export const ProductCardPage = ({ product, id, onAddProduct }) => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [products_amount, setProducts_amount] = useState("1");
  const { addToCart } = useCart();

  const handleAddToCart = async (data) => {
    await addToCart(data, onAddProduct);
  };

  // Verificamos si las propiedades de imagen están definidas y las filtramos
  const images = [
    product.image_one,
    product.image_two,
    product.image_tree,
  ].filter((image) => image != null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      handleNextProduct();
    }, 20000);
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
        <form className="quantity-selector" onSubmit={handleSubmit}>
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            type="number"
            defaultValue="1"
            min="1"
            onChange={(e) => setProducts_amount(e.target.value)}
          />
          <p className="productPage-price">{product.price} €</p>
          <button className="add-to-cart">Añadir al carrito</button>
        </form>
      </div>
    </div>
  );
};
