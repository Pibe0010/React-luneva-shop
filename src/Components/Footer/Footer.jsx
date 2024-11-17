import { AboutShop } from "./FooterSections/AboutShop.jsx";
import { CustomerService } from "./FooterSections/CustomerService.jsx";
import { QuckLinks } from "./FooterSections/QuckLinks.jsx";
import { SingUpForOffer } from "./FooterSections/SingUpForOffer.jsx";
import "./Footer.css";

export const Footer = () => {
  return (
    <section className="footer-container">
      <div className="footer-logo-container">
        <p className="footer-logo">Luneva Shop</p>
      </div>
      <section className="footer-section">
        <AboutShop />
        <CustomerService />
        <QuckLinks />
        <SingUpForOffer />
      </section>
      <p className="footer-separator"></p>
      <section className="footer-copyright">
        <p>© 2024 Luneva Shop. Todos los derechos reservados.</p>
      </section>
    </section>
  );
};
