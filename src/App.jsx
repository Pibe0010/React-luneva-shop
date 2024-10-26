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
import { RegisterPage } from "./Pages/RegisterPage.jsx";
import { CreateProductPage } from "./Pages/CreateProductPage.jsx";
import { TermsOfSalePage } from "./Pages/FooterPages/TermsOfSalePage.jsx";
import { ShippingAndDeliveryPage } from "./Pages/FooterPages/ShippingAndDeliveryPage.jsx";
import { ReturnPolicyPage } from "./Pages/FooterPages/ReturnPolicyPage.jsx";
import { ContactPage } from "./Pages/FooterPages/ContactPage.jsx";
import { SalePage } from "./Pages/FooterPages/SalePage.jsx";
import { HelpCenterPage } from "./Pages/FooterPages/HelpCenterPage.jsx";
import { ForgotPassword } from "./Pages/ForgotPassword.jsx";
import { UserLicenseAgreement } from "./Pages/UserLicenseAgreement.jsx";
import { ResetPassword } from "./Pages/ResetPassword.jsx";
import { CustomersPage } from "./Pages/CustomersPage.jsx";
import { ActivateAccount } from "./Pages/activateAccount.jsx";
import "./Styles/Pages/GeneralsFroms.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/tickets" element={<TicketPurchasesPage />} />
      <Route path="/address" element={<ShippingAddressPage />} />
      <Route path="/shipment" element={<ShipmentsPage />} />
      <Route path="/payment" element={<PaymentsPage />} />
      <Route path="/trolley" element={<TrolleyPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/license-agreement" element={<UserLicenseAgreement />} />
      <Route
        path="/user/reset-password/:registration_code"
        element={<ResetPassword />}
      />
      <Route
        path="/activate-account/:registration_code"
        element={<ActivateAccount />}
      />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/terms-sale" element={<TermsOfSalePage />} />
      <Route path="/shipping-delivery" element={<ShippingAndDeliveryPage />} />
      <Route path="/return-policy" element={<ReturnPolicyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/sale" element={<SalePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
