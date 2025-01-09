import { useState } from "react";
import { Card } from "../../Card/Card.jsx";
import { SearchBar } from "./SearchBar.jsx";
import defaultProduct from "/Icons/imageProduct.svg";

const URL = import.meta.env.VITE_URL;

export const ProductList = ({ product, search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const itemsPerPage = 4;

  if (!product || !Array.isArray(product)) {
    return (
      <section className="product-list">
        <h2 className="home-product-card-title">Jabònes</h2>
        <SearchBar onSearch={search} />
        <div className="products">
          <div className="noResult-card-product">
            El producto no se ha encontrado...
          </div>
        </div>
      </section>
    );
  }

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
    if (currentPage === 4) return;
    handlePageChange(currentPage + 1, "right");
  };

  const addPrevProducts = () => {
    if (currentPage === 1) return;
    handlePageChange(currentPage - 1, "left");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(product.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="product-list">
      <h2 className="home-product-card-title">Jabònes</h2>
      <SearchBar onSearch={search} />
      <div className="products">
        <div
          className={`card-product-container ${
            isAnimating
              ? direction === "right"
                ? "slide-right"
                : "slide-left"
              : ""
          }`}
        >
          <button className="prev-btn" onClick={addPrevProducts}>
            <img
              src="/Icons/arrow_back_ios_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg"
              alt="Anterior"
            />
          </button>
          {currentProducts && currentProducts.length > 0 ? (
            currentProducts.map((itemProduct) => (
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
              />
            ))
          ) : (
            <div className="noResult-card-product">
              El producto no se ha encontrado...
            </div>
          )}
        </div>
        <button className="next-btn" onClick={addNextProducts}>
          <img
            src="/Icons/arrow_forward_ios_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg"
            alt="Siguiente"
          />
        </button>
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-button ${currentPage === number ? "active" : ""}`}
            onClick={() =>
              handlePageChange(number, number > currentPage ? "right" : "left")
            }
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
};
