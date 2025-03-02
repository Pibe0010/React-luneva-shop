import { Link } from "react-router-dom";
import { ButtonFooterRegister } from "../../Buttons/ButtonFooter/ButtonFooterRegister.jsx";
import "./SingUpForOffers.css";
import { Social } from "../../Socials/Social.jsx";

export const SingUpForOffer = () => {
  return (
    <div className="singUpForOffer-container">
      <h3 className="singUpForOffer-title">
        Registrate para obetener las nuevas ofertas speciales de nuestros
        productos.
      </h3>
      <div className="singUpForOffer-button">
        <Link to="/register">
          <ButtonFooterRegister />
        </Link>
      </div>
      <div>
        <Social />
      </div>
    </div>
  );
};
