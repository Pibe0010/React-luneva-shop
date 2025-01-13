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
      <div id="element_offer_subtitle" className="mainOfferInsideSub">
        <p className="refTitle">Nombre: {nameComplete}</p>
      </div>

      <p className="mainOfferInsideSub">
        <strong>Precio: </strong> {offer.price} €
      </p>
      <p className="mainOfferInsideSub">
        <strong>Descuento: </strong> {offer.discount_rate} €
      </p>
      <p className="mainOfferInsideSub">
        <strong>Inicio: </strong>{" "}
        {GetNormalizaDate(offer.start_date).toLocaleDateString()}
      </p>
      <p className="mainOfferInsideSub">
        <strong>Fin: </strong>{" "}
        {GetNormalizaDate(offer.ending_date).toLocaleDateString()}
      </p>
      <p className="mainOfferInsideSub">
        <strong>Estado: </strong>{" "}
        <span className={activeClass}>{statusController(isActive)}</span>
      </p>
    </>
  );
};
