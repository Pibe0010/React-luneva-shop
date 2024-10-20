import { MainLayout } from "../Layout/MainLayout.jsx";
import { ProductStock } from "../Components/PagesComponents/Product/ProductStock.jsx";
import "../Styles/Pages/ProductPage.css";

export const CreateProductPage = () => {
  return (
    <MainLayout>
      <section className="product-container">
        <ProductStock />
      </section>
    </MainLayout>
  );
};
