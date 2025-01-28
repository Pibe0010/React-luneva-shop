import { useState } from "react";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { SideBarFilter } from "../Components/PagesComponents/ProductPage/SideBarFilter.jsx";
import { ProductListPage } from "../Components/PagesComponents/ProductPage/ProductListPage.jsx";
import "../Styles/Pages/ProductPage.css";

import { useCart } from "../Context/CartContext.jsx";

export const ProductsPage = () => {
  const [filter, setFilter] = useState("all");
  const { filteredProductList, handleSortChange, sortOptions, defaultSort } =
    useCart();

  return (
    <MainLayout>
      <section className="product-section">
        <SideBarFilter
          setFilter={setFilter}
          options={sortOptions}
          onSort={handleSortChange}
          defaultSort={defaultSort}
        />
        <ProductListPage filter={filter} products={filteredProductList} />
      </section>
    </MainLayout>
  );
};
