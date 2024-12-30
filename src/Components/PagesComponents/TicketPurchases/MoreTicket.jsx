import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreTicket = ({ ticket }) => {
  const moreInfoFields = [
    { label: "Ref", value: "" + ticket.ref_OR },
    { label: "Nombre", value: "" + ticket.name },
    { label: "Producto", value: "" + ticket.name },
    { label: "Precio", value: "" + ticket.price + " €" },
    { label: "Cantidad", value: "" + ticket.product_amount + " u." },
    {
      label: "Creado",
      value: "" + GetNormalizaDate(ticket.createdAt).toLocaleDateString(),
    },
  ];

  const modalIds = {
    classState: "font-bold",
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
