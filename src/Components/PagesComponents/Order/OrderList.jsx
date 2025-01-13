import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./OrderList.css";

export const OrderList = ({ order }) => {
  const nameComplete = `${order.user_name} ${order.last_name} `;

  const statusTranslations = {
    earring: "Pendiente",
    sent: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };

  return (
    <>
      <div id="element_order_subtitle" className="mainOrderInsideSub">
        <p className="refOrderTitle">Nombre: {nameComplete}</p>
      </div>
      <p className="mainOrderInsideSub">
        <strong>E-mail: </strong> {order.email}
      </p>
      <p className="mainOrderInsideSub">
        <strong>Producto: </strong> {order.name}
      </p>

      <p className="mainOrderInsideSub">
        <strong>Precio: </strong> {order.price} €
      </p>
      <p className="mainOrderInsideSub">
        <strong>Cantidad: </strong> {order.product_amount} u
      </p>
      <p className="mainOrderInsideSub">
        <strong>Descuento: </strong>{" "}
        {order.product_discount ? `${order.product_discount} €` : "0 €"}
      </p>
      <p className="mainOrderInsideSub">
        <strong>Creado: </strong>{" "}
        {GetNormalizaDate(order.createdAt).toLocaleDateString()}
      </p>
      <p className="mainOrderInsideSub">
        <strong>Estado: </strong>{" "}
        <span
          className={`orderTableBodyRowStatus ${order.status.toLowerCase()}`}
        >
          {statusTranslations[order.status.toLowerCase()] || order.status}
        </span>
      </p>
    </>
  );
};
