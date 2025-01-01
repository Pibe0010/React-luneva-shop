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
      <div id="element_payment_subtitle" className="mainInsideSub">
        <p className="refTitle">Ref_PM: {payment.ref_PM}</p>
      </div>
      <p className="mainInsideSub">
        <strong>Nombre: </strong> {nameComplete}
      </p>
      <p className="mainInsideSub">
        <strong>Producto: </strong> {payment.name}
      </p>

      <p className="mainInsideSub">
        <strong>Cantidad: </strong> {payment.product_amount} u
      </p>
      <p className="mainInsideSub">
        <strong>Precio: </strong> {payment.product_price} €
      </p>
      <p className="mainInsideSub">
        <strong>Pago: </strong> {payment.price} €
      </p>
      <p className="mainInsideSub">
        <strong>Iva: </strong> {payment.iva_payments} %
      </p>
      <p className="mainInsideSub">
        <strong>Total: </strong> {payment.total_amount} €
      </p>
      <p className="mainInsideSub">
        <strong>Metodo: </strong> {payment.payment_method}
      </p>
      <p className="mainInsideSub">
        <strong>Estado: </strong>{" "}
        <span
          className={`orderTableBodyRowStatus ${payment.status.toLowerCase()}`}
        >
          {statusTranslations[payment.status.toLowerCase()] || payment.status}
        </span>
      </p>
      <p className="mainInsideSub">
        <strong>Emitido: </strong>{" "}
        {GetNormalizaDate(payment.createdAt).toLocaleDateString()}
      </p>
      <p className="mainInsideSub">
        <strong>Actualizado: </strong>{" "}
        {GetNormalizaDate(payment.updatedAt).toLocaleDateString()}
      </p>
    </>
  );
};
