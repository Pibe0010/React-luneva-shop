import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreOrder = ({ order }) => {
  const statusTranslations = {
    earring: "Pendiente",
    sent: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "earring":
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

  const discount = order.product_discount
    ? `${order.product_discount} €`
    : "0 €";

  const moreInfoFields = [
    { label: "Ref", value: "" + order.ref_OR },
    { label: "Nombre", value: "" + order.name },
    { label: "E-mail", value: "" + order.email },
    { label: "Producto", value: "" + order.name },
    { label: "Precio", value: "" + order.price + " €" },
    { label: "Cantidad", value: "" + order.quantity + " u." },
    { label: "Descuento", value: "" + discount },
    {
      label: "Estado",
      value: "" + statusTranslations[order.status],
      color: getStatusClass(order.status),
    },
    {
      label: "Creado",
      value: "" + GetNormalizaDate(order.createdAt).toLocaleDateString(),
    },
  ];

  const modalIds = {
    classState: "font-bold",
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
