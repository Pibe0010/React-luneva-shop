import { useEffect, useState } from "react";
import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./OfferList.css";

export const OfferList = ({ offer }) => {
  const nameComplete = `${offer.name} `;

  const statusController = (status) => {
    return status ? "Activo" : "Inactivo";
  };

  // Estado para controlar si  está activo o no
  const [isActive, setIsActive] = useState(offer.active);

  useEffect(() => {
    setIsActive(offer.active);
  }, [offer.active]);

  const activeClass = isActive ? "active" : "inactive";

  return (
    <>
      <div id="element_offer_subtitle" className="mainInsideSub">
        <p className="refTitle">Nombre: {nameComplete}</p>
      </div>

      <p className="mainInsideSub">
        <strong>Precio: </strong> {offer.price} €
      </p>
      <p className="mainInsideSub">
        <strong>Descuento: </strong> {offer.discount_rate} €
      </p>
      <p className="mainInsideSub">
        <strong>Inicio: </strong>{" "}
        {GetNormalizaDate(offer.start_date).toLocaleDateString()}
      </p>
      <p className="mainInsideSub">
        <strong>Fin: </strong>{" "}
        {GetNormalizaDate(offer.ending_date).toLocaleDateString()}
      </p>
      <p className="mainInsideSub">
        <strong>Estado: </strong>{" "}
        <span className={activeClass}>{statusController(isActive)}</span>
      </p>
    </>
  );
};
