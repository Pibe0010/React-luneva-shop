import { useEffect, useState } from "react";
import { useUser } from "../../../Context/AutContext.jsx";
import { useProductList } from "../../../Hooks/PagesHooks/useProductList.js";
import { ProductList } from "./ProductList.jsx";
import { ToggleMode } from "../../NavPages/ToggleMode.jsx";
import { FilterPage } from "../../NavPages/FilterPage.jsx";
import { SortPage } from "../../NavPages/SortPage.jsx";
import { ProductListTable } from "./ProductListTable.jsx";
import { MoreProduct } from "./MoreProduct.jsx";
import { StatusProductController } from "./StatusProductController.jsx";
import { UpdateProduct } from "./UpdateProduct.jsx";
import { DeleteGenericModal } from "./DeleteGenericModal.jsx";
import { CreateProduct } from "../../Forms/CreateProduct/CreateProduct.jsx";
import "./ProductStock.css";
import { InsertImg } from "./InsertImg.jsx";
import { SearchPage } from "../../NavPages/SearchPages.jsx";

export const ProductStock = () => {
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
                    formTypes="product"
                  />
                  <DeleteGenericModal
                    id={product.ID_product}
                    onDelete={deleteProduct}
                    token={token}
                  />
                  <InsertImg
                    id={product.ID_product}
                    product={product}
                    onUpdateProduct={updateProduct}
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
        />
      )}
    </section>
  );
};
