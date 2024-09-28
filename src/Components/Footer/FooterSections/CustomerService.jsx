import { NavLinks } from "../../NavLinks/NavLinks.jsx";
import "./CustomerService.css";

export const CustomerService = () => {
  return (
    <div className="customerService-container">
      <h3 className="customerService-title">Servicios al cliente</h3>
      <div className="customerService-links">
        <NavLinks
          url="/help-center"
          className="helpCenter"
          name="Centro de ayuda"
        />
        <NavLinks
          url="/terms-sale"
          className="termsSale"
          name="Condiciones de venta"
        />
        <NavLinks
          url="/shipping-delivery"
          className="shippingDelivery"
          name="Envio y entrega"
        />
        <NavLinks
          url="/return-policy"
          className="returnPolicy"
          name="Política de devolución"
        />
      </div>
    </div>
  );
};
