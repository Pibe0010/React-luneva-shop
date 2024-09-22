import { Route, Routes } from "react-router";
import "./App.css";
import { NotFoundPage } from "./Pages/NotFoundPage.jsx";
import { HomePage } from "./Pages/HomePage.jsx";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { OffersPage } from "./Pages/OffersPage.jsx";
import { OrdersPage } from "./Pages/OrdersPage.jsx";
import { ProductsPage } from "./Pages/ProductsPage.jsx";
import { TicketPurchasesPage } from "./Pages/TicketPurchasesPage.jsx";
import { ShippingAddressPage } from "./Pages/ShippingAddressPage.jsx";
import { ShipmentsPage } from "./Pages/ShipmentsPage.jsx";
import { PaymentsPage } from "./Pages/PaymentsPage.jsx";
import { TrolleyPage } from "./Pages/TrolleyPage.jsx";
import { UserProfilePage } from "./Pages/UserProfilePage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/tickets" element={<TicketPurchasesPage />} />
      <Route path="/address" element={<ShippingAddressPage />} />
      <Route path="/shipment" element={<ShipmentsPage />} />
      <Route path="/payment" element={<PaymentsPage />} />
      <Route path="/trolley" element={<TrolleyPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
