import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreOffer = ({ offer }) => {
  const active = offer.active ? "Activo" : "Inactivo";
  const activeClass = offer.active ? "green" : "red";

  const moreInfoFields = [
    { label: "Nombre", value: "" + offer.name },
    { label: "Precio", value: "" + offer.price + " €" },
    { label: "Descuento", value: "" + offer.discount_rate + " €" },
    {
      label: "Inicio",
      value: "" + GetNormalizaDate(offer.start_date).toLocaleDateString(),
    },
    {
      label: "Fin",
      value: "" + GetNormalizaDate(offer.ending_date).toLocaleDateString(),
    },
    { label: "Activo", value: "" + active, color: activeClass },
  ];

  const modalIds = {
    classState: "font-bold",
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
