import { useEffect, useState } from "react";
import { Card } from "../../Card/Card.jsx";
import { SearchBar } from "./SearchBar.jsx";
import defaultProduct from "/Icons/imageProduct.svg";
import { NextBtn } from "../../Buttons/NextBtn/NextBtn.jsx";
import { PrevBtn } from "../../Buttons/PrevBtn/PrevBtn.jsx";
import { Loader } from "../../Animations/Loader.jsx";
import { useResizeHandler } from "../../../Hooks/useResizeHandler.jsx";
const URL = import.meta.env.VITE_URL;

export const ProductList = ({ product = [], search }) => {
  const { itemsPerPage, isMobile, isViewNumPages } = useResizeHandler();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // Control de carga y estado de productos
  useEffect(() => {
    if (!product || !Array.isArray(product) || product.length === 0) {
      setIsLoading(true);
      setShowNotFound(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowNotFound(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setShowNotFound(false);
    }
  }, [product]);

  // Índices para la paginación
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = Array.isArray(product)
    ? product.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Array.isArray(product)
    ? Math.ceil(product.length / itemsPerPage)
    : 0;

  // Cambio de página con animación
  const handlePageChange = (newPage, animationDirection) => {
    if (newPage !== currentPage) {
      setDirection(animationDirection);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentPage(newPage);
        setIsAnimating(false);
      }, 305);
    }
  };

  const addNextProducts = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1, "right");
    }
  };

  const addPrevProducts = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1, "left");
    }
  };

  return (
    <section className="home-product-list">
      <h2 className="home-product-card-title">Jabónes</h2>
      <SearchBar onSearch={search} />
      <div className="products">
        {isLoading && (
          <div className="noResult-card-product">
            <Loader />
          </div>
        )}
        {showNotFound && (
          <div className="noResult-card-product">
            <p>El producto no se ha encontrado...</p>
          </div>
        )}
        {!isLoading && !showNotFound && (
          <>
            {!isMobile && <PrevBtn addPrevProducts={addPrevProducts} />}
            <div
              className={`card-product-container ${
                isAnimating
                  ? direction === "right"
                    ? "slide-right"
                    : "slide-left"
                  : ""
              }`}
            >
              {currentProducts.map((itemProduct) => (
                <Card
                  key={itemProduct.ID_product}
                  title={itemProduct.name}
                  btnName={"Añadir al carrito"}
                  description={itemProduct.description}
                  price={itemProduct.price}
                  alt={`Jabòn de ${itemProduct.name}`}
                  src={
                    itemProduct.image_one
                      ? `${URL}/uploads/products/${itemProduct.ID_product}/${itemProduct.image_one}`
                      : defaultProduct
                  }
                  id={itemProduct.ID_product}
                />
              ))}
            </div>
            {!isMobile && <NextBtn addNextProducts={addNextProducts} />}
          </>
        )}
      </div>
      {!isLoading && !showNotFound && (
        <div className="pagination">
          {isViewNumPages ? (
            <>
              <PrevBtn
                addPrevProducts={addPrevProducts}
                disabled={currentPage === 1}
              />
              <button className="pagination-button active">
                {currentPage}
              </button>
              <NextBtn
                addNextProducts={addNextProducts}
                disabled={currentPage === totalPages}
              />
            </>
          ) : (
            Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  className={`pagination-button ${
                    currentPage === number ? "active" : ""
                  }`}
                  onClick={() =>
                    handlePageChange(
                      number,
                      number > currentPage ? "right" : "left"
                    )
                  }
                >
                  {number}
                </button>
              )
            )
          )}
        </div>
      )}
    </section>
  );
};
