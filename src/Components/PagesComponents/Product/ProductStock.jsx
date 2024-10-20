import { useEffect, useState } from "react";
import { useUser } from "../../../Context/AutContext.jsx";
import { useProductList } from "../../../Hooks/PagesHooks/useProductList.js";
import { ProductList } from "./ProductList.jsx";
import { ToggleMode } from "../../NavPages/ToggleMode.jsx";
import { SearchPage } from "../../Navpages/SearchPage.jsx";
import { FilterPage } from "../../NavPages/FilterPage.jsx";
import { SortPage } from "../../NavPages/SortPage.jsx";
import { ProductListTable } from "./ProductListTable.jsx";
import { MoreProduct } from "./MoreProduct.jsx";
import { StatusProductController } from "./StatusProductController.jsx";
import { UpdateProduct } from "./UpdateProduct.jsx";
import { DeleteGenericModal } from "./DeleteGenericModal.jsx";
import { CreateProduct } from "../../Forms/CreateProduct/CreateProduct.jsx";
import { ProductImg } from "./ProductImg.jsx";
import "./ProductStock.css";

export const ProductStock = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = useUser();

  const {
    filteredProductList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addProduct,
    deleteProduct,
    updateProduct,
    activeProduct,
  } = useProductList(token);

  // Función para manejar el click en un producto
  const handleProductClick = (product) => {
    if (selectedProduct?.ID_product === product.ID_product) {
      setSelectedProduct(null); // Deselecciona el producto
    } else {
      setSelectedProduct(product); // Selecciona el nuevo producto
    }
  };

  const [isListView, setIsListView] = useState(() => window.innerWidth <= 1060);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 1060);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterOptions = [
    { label: "Activo", value: "1" },
    { label: "Inactivo", value: "0" },
  ];

  const sortOptions = [
    { label: "Ref (DSC)", value: "ref-desc" },
    { label: "Ref (ASC)", value: "ref-asc" },
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Stock (DSC)", value: "stock-asc" },
    { label: "Stock (ASC)", value: "stock-desc" },
  ];

  const defaultSort = { label: "Ref (DSC)", value: "ref-desc" };

  /*   const logoHidden = selectedProduct ? "hidden" : ""; */

  return (
    <section id="product_container" className="mainContainer">
      <nav id="user_nav" className="mainNav">
        <SearchPage onSearch={handleSearch} />
        <CreateProduct onAddProduct={addProduct} token={token} />
        <FilterPage options={filterOptions} onChange={handleFilterChange} />
        <SortPage
          options={sortOptions}
          onSort={handleSortChange}
          defaultSort={defaultSort}
        />
        <ToggleMode
          onClick={() => setIsListView((prev) => !prev)}
          isListView={isListView}
        />
      </nav>
      {isListView ? (
        <ol id="product_list" className="main_olist">
          {filteredProductList.length > 0 ? (
            filteredProductList.map((product) => (
              <li
                key={product.ID_product}
                id="element_product_container"
                className="main_ilist"
                onClick={() => handleProductClick(product)}
              >
                <ProductList
                  product={product}
                  activeProduct={activeProduct}
                  token={token}
                />
                <span id="product_actions" className="main_actions">
                  <MoreProduct product={product} />
                  <StatusProductController
                    id={product.ID_product}
                    isActive={product.active}
                    activeProduct={activeProduct}
                    token={token}
                  />
                  <UpdateProduct
                    id={product.ID_product}
                    onUpdateProduct={updateProduct}
                    productData={product}
                  />
                  <DeleteGenericModal
                    id={product.ID_product}
                    onDelete={deleteProduct}
                    token={token}
                  />
                </span>
              </li>
            ))
          ) : (
            <div className="noResult">No hay productos disponibles</div>
          )}
        </ol>
      ) : (
        <ProductListTable
          product={filteredProductList}
          onUpdateProduct={updateProduct}
          onDelete={deleteProduct}
          isActive={activeProduct}
          logo={handleProductClick}
        />
      )}

      <div className="product-image-container">
        {selectedProduct === null ? (
          <img
            className="product-logo"
            src="/img/luneva.png"
            alt="Default product icon"
          />
        ) : (
          filteredProductList.map((product) =>
            selectedProduct.ID_product === product.ID_product ? (
              <div className="product-image-container" key={product.ID_product}>
                <ProductImg
                  id={product.ID_product}
                  images={product}
                  onUpdateProduct={updateProduct}
                />
              </div>
            ) : null
          )
        )}
      </div>
    </section>
  );
};
