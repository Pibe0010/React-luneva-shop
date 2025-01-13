import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./PaymentList.css";

export const PaymentList = ({ payment }) => {
  const nameComplete = `${payment.user_name} ${payment.last_name} `;

  const statusTranslations = {
    pendig: "Pendiente",
    paid: "Pagado",
    cancelled: "Cancelado",
  };

  return (
    <>
      <div id="element_payment_subtitle" className="mainPayInsideSub">
        <p className="refPayTitle">Ref_PM: {payment.ref_PM}</p>
      </div>
      <p className="mainPayInsideSub">
        <strong>Nombre: </strong> {nameComplete}
      </p>
      <p className="mainPayInsideSub">
        <strong>Producto: </strong> {payment.name}
      </p>

      <p className="mainPayInsideSub">
        <strong>Cantidad: </strong> {payment.product_amount} u
      </p>
      <p className="mainPayInsideSub">
        <strong>Precio: </strong> {payment.product_price} €
      </p>
      <p className="mainPayInsideSub">
        <strong>Pago: </strong> {payment.price} €
      </p>
      <p className="mainPayInsideSub">
        <strong>Iva: </strong> {payment.iva_payments} %
      </p>
      <p className="mainPayInsideSub">
        <strong>Total: </strong> {payment.total_amount} €
      </p>
      <p className="mainPayInsideSub">
        <strong>Metodo: </strong> {payment.payment_method}
      </p>
      <p className="mainPayInsideSub">
        <strong>Estado: </strong>{" "}
        <span
          className={`orderTableBodyRowStatus ${payment.status.toLowerCase()}`}
        >
          {statusTranslations[payment.status.toLowerCase()] || payment.status}
        </span>
      </p>
      <p className="mainPayInsideSub">
        <strong>Emitido: </strong>{" "}
        {GetNormalizaDate(payment.createdAt).toLocaleDateString()}
      </p>
      <p className="mainPayInsideSub">
        <strong>Actualizado: </strong>{" "}
        {GetNormalizaDate(payment.updatedAt).toLocaleDateString()}
      </p>
    </>
  );
};
