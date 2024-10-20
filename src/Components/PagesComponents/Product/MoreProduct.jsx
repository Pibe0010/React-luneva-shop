import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreProduct = ({ product }) => {
  const active = product.active ? "Activo" : "Inactivo";
  const activeClass = product.active ? "green" : "red";

  const moreInfoFields = [
    { label: "Ref", value: "" + product.ref_PR },
    { label: "Nombre", value: "" + product.name },
    { label: "Precio", value: "" + product.price + " €" },
    { label: "Stock", value: "" + product.Stock + " u." },
    { label: "Estado", value: "" + active, color: activeClass },
    { label: "Descripción", value: "" + product.description },
  ];

  const modalIds = {
    classState: "font-bold",
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
