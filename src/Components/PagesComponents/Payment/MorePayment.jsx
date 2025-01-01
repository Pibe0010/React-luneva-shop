import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MorePayment = ({ payment }) => {
  const statusTranslations = {
    pending: "Pendiente",
    sent: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "royalblue";
      case "sent":
        return "green";
      case "delivered":
        return "grey";
      case "cancelled":
        return "red";
      default:
        return "status-default";
    }
  };

  const nameComplete = `${payment.user_name} ${payment.last_name} `;

  const moreInfoFields = [
    { label: "Ref", value: "" + payment.ref_PM },
    { label: "Nombre", value: "" + nameComplete },
    { label: "Producto", value: "" + payment.name },
    { label: "Cantidad", value: "" + payment.product_amount + " u." },
    { label: "Precio", value: "" + payment.product_price + " €" },
    { label: "Pago", value: "" + payment.price + " u." },
    { label: "Iva", value: "" + payment.iva_payments + " %" },
    { label: "Total", value: "" + payment.total_amount + " €" },
    { label: "Metedo", value: "" + payment.payment_method },
    {
      label: "Estado",
      value: "" + statusTranslations[payment.status],
      color: getStatusClass(payment.status),
    },
    {
      label: "Emitido",
      value: "" + GetNormalizaDate(payment.createdAt).toLocaleDateString(),
    },
    {
      label: "Actualizado",
      value: "" + GetNormalizaDate(payment.updatedAt).toLocaleDateString(),
    },
  ];

  const modalIds = {
    classState: "font-bold",
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
