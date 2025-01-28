import { useEffect, useState } from "react";
import { Loader } from "../../Animations/Loader.jsx";
import { ProductCardPage } from "./ProductCardPage.jsx";
import { useUser } from "../../../Context/AutContext.jsx";

export const ProductListPage = ({ filter, products }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const token = useUser();

  useEffect(() => {
    if (!products || !Array.isArray(products) || products.length === 0) {
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
  }, [products]);

  let filteredProductsPage = [];

  if (filter === "all") {
    filteredProductsPage = products;
  } else {
    filteredProductsPage = products.filter(
      (product) => product.category === filter
    );
  }

  if (typeof filter === "number") {
    filteredProductsPage = products.filter(
      (product) => product.price <= filter
    );
  }

  return (
    <div className="product-list">
      {isLoading && (
        <div className="noResult-product-page">
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
          {filteredProductsPage.map((product) => (
            <ol key={product.ID_product} style={{ listStyle: "none" }}>
              <li>
                <ProductCardPage
                  id={product.ID_product}
                  product={product}
                  token={token}
                />
              </li>
            </ol>
          ))}
        </>
      )}
    </div>
  );
};
