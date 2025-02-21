import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./AddressList.css";

export const AddressList = ({ address }) => {
  const nameComplete = `${address.user_name} ${address.last_name} `;
  return (
    <>
      <div id="element_address_subtitle" className="mainAddressInsideSub">
        <p className="refaddressTitle">Nombre: {nameComplete}</p>
      </div>

      <p className="mainAddressInsideSub">
        <strong>Calle: </strong> {address.address}
      </p>
      <p className="mainAddressInsideSub">
        <strong>Número: </strong> {address.street_number}
      </p>
      <p className="mainAddressInsideSub">
        <strong>Escalera: </strong>{" "}
        {address.floor === null ? "N/A" : address.floor}
      </p>
      <p className="mainAddressInsideSub">
        <strong>Piso / puerta: </strong>{" "}
        {address.ladder_door === null ? "N/A" : address.ladder_door}
      </p>
      <p className="mainAddressInsideSub">
        <strong>Ciudad: </strong> {address.city}
      </p>
      <p className="mainAddressInsideSub">
        <strong>Pais: {address.country} </strong>{" "}
      </p>
      <p className="mainAddressInsideSub">
        <strong>
          Creado:{GetNormalizaDate(address.createdAt).toLocaleDateString()}{" "}
        </strong>{" "}
      </p>
    </>
  );
};
