import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreTicket = ({ ticket }) => {
  const statusTranslations = {
    pending: "Pendiente",
    sent: "Enviado",
    cancelled: "Cancelado",
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "royalblue";
      case "sent":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "status-default";
    }
  };
  const listTicketUser = [ticket];

  // Obtener fechas únicas de creación
  const uniqueDates = [
    ...new Set(
      (listTicketUser || []).map((ticket) =>
        new Date(ticket.createdAt).toLocaleString()
      )
    ),
  ];

  // Filtrar tickets según la fecha seleccionada
  const currentOrderTickets = listTicketUser.filter(
    (ticket) => new Date(ticket.createdAt).toLocaleString() == uniqueDates
  );

  // Calcular totales
  const subtotal = currentOrderTickets.reduce(
    (acc, product) =>
      acc + parseFloat(product.product_price) * product.product_amount,
    0
  );
  const totalDiscount = currentOrderTickets.reduce(
    (acc, product) =>
      acc +
      (product.offer_discount
        ? (parseFloat(product.product_price) - product.offer_discount) *
          product.product_amount
        : 0),
    0
  );
  const shipping = currentOrderTickets.reduce(
    (acc, product) => acc + parseFloat(product.shipment_cost),
    0
  );
  const iva = subtotal * 0.21;
  const total = subtotal - totalDiscount + shipping + iva;

  const moreInfoFields = [
    { label: "Ref", value: "" + ticket.ref_OR },
    { label: "Nombre", value: "" + ticket.user_name },
    { label: "Producto", value: "" + ticket.name },
    { label: "Precio", value: "" + ticket.product_price + " €" },
    { label: "Cantidad", value: "" + ticket.product_amount + " u." },
    { label: "Descuento", value: "" + totalDiscount.toFixed(2) + " €." },
    { label: "Iva", value: "" + iva.toFixed(2) + " €" },
    { label: "Precio de envio", value: "" + shipping.toFixed(2) + " €" },

    {
      label: "Total",
      value: "" + total.toFixed(2) + " €.",
    },
    {
      label: "Estado",
      value: "" + statusTranslations[ticket.status],
      color: getStatusClass(ticket.status),
    },
    {
      label: "Creado",
      value: "" + GetNormalizaDate(ticket.createdAt).toLocaleString(),
    },
  ];

  const modalIds = {
    classState: "font-bold",
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
