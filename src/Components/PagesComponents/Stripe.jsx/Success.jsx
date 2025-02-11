import { Link } from "react-router-dom";
import "./Success.css";
import { CardSuccess } from "../../Card/CardSuccess.jsx";

export const Success = () => {
  return (
    <section className="success-container">
      <h1 className="success-title">Compra realizada con exito.</h1>
      <CardSuccess />
      <Link className="success-link" to="/">
        Volver al inicio
      </Link>
    </section>
  );
};
