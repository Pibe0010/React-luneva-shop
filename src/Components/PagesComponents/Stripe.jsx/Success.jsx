import { Link } from "react-router-dom";
import "./Success.css";
import { CardSuccess } from "../../Card/CardSuccess.jsx";
import { useEffect, useRef } from "react";
import { useCart } from "../../../Context/CartContext.jsx";
import { useUser } from "../../../Context/AutContext.jsx";
const URL = import.meta.env.VITE_URL;

export const Success = () => {
  const token = useUser();
  const { clearCart } = useCart();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      clearCart();
      const changeStatus = async () => {
        try {
          const response = await fetch(`${URL}/payment/success/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });

          if (response.ok) {
            console.log("Estados cambiados exitosamente");
          } else {
            console.error("Error al cambiar los estados");
          }
        } catch (error) {
          console.error("Error al cambiar los estados:", error);
        }
      };

      changeStatus();
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
