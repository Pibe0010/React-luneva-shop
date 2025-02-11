import { Link } from "react-router-dom";
import "./CardSuccess.css";

export const CardSuccess = () => {
  return (
    <div className="success-card">
      <div className="success-card__border"></div>
      <div className="success-card_title__container">
        <span className="success-card_title">¡Gracias por tu compra!</span>
        <p className="success-card_paragraph">
          Su pedido sera enviado el un plazo de 72 horas aviables.
        </p>
      </div>
      <hr className="line" />
      <ul className="success-card__list">
        <li className="success-card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <span className="success-list_text">Diercción de envio.</span>
        </li>
        <li className="success-card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <span className="success-list_text">Metodo de pago.</span>
        </li>
        <li className="success-card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <span className="success-list_text">Pago realizado.</span>
        </li>
        <li className="success-card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <span className="success-list_text">Envio en proceso.</span>
        </li>
        <li className="success-card__list_item">
          <span className="check">
            <svg
              className="check_svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <span className="success-list_text">
            Proseso completado con exito.
          </span>
        </li>
      </ul>
      <Link to="/products" className="success-button">
        Seguir comprando
      </Link>
    </div>
  );
};
