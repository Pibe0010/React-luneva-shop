import { useEffect, useState } from "react";
import { Card } from "../../Card/Card.jsx";
import { SearchBar } from "./SearchBar.jsx";
import defaultProduct from "/Icons/imageProduct.svg";
import { NextBtn } from "../../Buttons/NextBtn/NextBtn.jsx";
import { PrevBtn } from "../../Buttons/PrevBtn/PrevBtn.jsx";
const URL = import.meta.env.VITE_URL;

export const ProductList = ({ product, search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isViewNumPages, setIsViewNumPages] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 860) {
        setItemsPerPage(1);
        setIsMobile(false);
        setIsViewNumPages(false);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResizeMobile = () => {
      if (window.innerWidth <= 450) {
        setItemsPerPage(1);
        setIsViewNumPages(true);
        setIsMobile(true);
      }
    };

    handleResizeMobile(); // Ejecutar al inicio para configurar según el tamaño actual
    window.addEventListener("resize", handleResizeMobile);
    return () => {
      window.removeEventListener("resize", handleResizeMobile);
    };
  }, []);

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
    const totalPages = Math.ceil(product.length / itemsPerPage);
    if (currentPage >= totalPages) return;
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
        {!isMobile && <NextBtn addNextProducts={addNextProducts} />}
      </div>
      {isViewNumPages === false ? (
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`pagination-button ${currentPage === number ? "active" : ""}`}
              onClick={() =>
                handlePageChange(
                  number,
                  number > currentPage ? "right" : "left"
                )
              }
            >
              {number}
            </button>
          ))}
        </div>
      ) : (
        <div className="pagination">
          <PrevBtn
            addPrevProducts={addPrevProducts}
            disabled={currentPage === 1}
          />
          <button className="pagination-button active">{currentPage}</button>
          <NextBtn
            addNextProducts={addNextProducts}
            disabled={currentPage === Math.ceil(product.length / itemsPerPage)}
          />
        </div>
      )}
    </section>
  );
};
