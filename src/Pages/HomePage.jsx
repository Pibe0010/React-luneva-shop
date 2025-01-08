import { Futuredproduct } from "../Components/PagesComponents/Home/Futuredproduct.jsx";
import { Slider } from "../Components/PagesComponents/Home/Slider.jsx";
import { ProductInfor } from "../Components/PagesComponents/Home/ProductInfor.jsx";
import { ProductList } from "../Components/PagesComponents/Home/ProductList.jsx";
import { StoreInfo } from "../Components/PagesComponents/Home/StoreInfo.jsx";
import { MainLayout } from "../Layout/MainLayout.jsx";
import "../Styles/Pages/HomePage.css";
import { useUser } from "../Context/AutContext.jsx";
import { useOfferList } from "../Hooks/PagesHooks/useOfferList.js";
import { useProductList } from "../Hooks/PagesHooks/useProductList.js";

export const HomePage = () => {
  const token = useUser();
  const { filteredOfferList } = useOfferList(token);
  const { filteredProductList, handleSearch } = useProductList(token);

  return (
    <MainLayout>
      <div className="home-container">
        <Slider />
        <Futuredproduct products={filteredOfferList} />
        <ProductList search={handleSearch} product={filteredProductList} />
        <StoreInfo />
        <ProductInfor />
      </div>
    </MainLayout>
  );
};
