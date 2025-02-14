import { Link } from "react-router-dom";
import "./CancelPay.css";
import { useEffect, useRef } from "react";
import { useUser } from "../../../Context/AutContext.jsx";
const URL = import.meta.env.VITE_URL;
export const CancelPay = () => {
  const token = useUser();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      const deleteData = async () => {
        try {
          const response = await fetch(`${URL}/payment/cancel`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });

          if (response.ok) {
            console.log("Datos eliminados exitosamente");
          } else {
            console.error("Error al eliminar los datos", response.data);
          }
        } catch (error) {
          console.error("Error al eliminar los datos:", error);
        }
      };

      deleteData();
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="cancelPay-container">
      <h1 className="cancelPay-title">Su pago ha sido cancelado..</h1>
      <div className="cancel-pyramid-loader">
        <div className="cancel-wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
      <div className="cancelPay-button">
        <Link to={"/"} className="cancelPay-btn-home">
          Home
        </Link>
        <Link to={"/products"} className="cancelPay-btn">
          Productos
        </Link>
        <Link to={"/special-offers"} className="cancelPay-btn-home">
          Ofertas
        </Link>
      </div>
    </section>
  );
};
