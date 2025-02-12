import { Link } from "react-router-dom";
import "./Success.css";
import { CardSuccess } from "../../Card/CardSuccess.jsx";
import { useEffect, useRef } from "react";
import { useCart } from "../../../Context/CartContext.jsx";

export const Success = () => {
  const { clearCart } = useCart();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      clearCart();
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
