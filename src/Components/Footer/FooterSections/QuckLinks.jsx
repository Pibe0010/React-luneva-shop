import { NavLinks } from "../../NavLinks/NavLinks.jsx";
import "./QuckLinks.css";

export const QuckLinks = () => {
  return (
    <div className="quckLinks-container">
      <h3 className="quckLinks-title">Enlaces rapidos</h3>
      <NavLinks url="/profile" className="profileFooter" name="Mi tarjeta" />
      <NavLinks url="/" className="shopFooter" name="Tienda" />
      <NavLinks url="/contact" className="contactFooter" name="Contacto" />
      <NavLinks url="/sale" className="saleFooter" name="Ventas" />
    </div>
  );
};
