import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./AddressListTable.css";

export const AddressListTable = ({ address }) => {
  console.log(address);
  return (
    <section id="customer_table" className="addressTable">
      <div className="addressTableHead">
        <div className="addressTableHeadName headRow">Nombre</div>
        <div className="addressTableHeadRowStreet headRow">Calle</div>
        <div className="addressTableHeadRowNumber headRow">Numero</div>
        <div className="addressTableHeadRowFloor headRow">Escalera</div>
        <div className="addressTableHeadRowLadderDoor headRow">
          Piso / Puerta
        </div>
        <div className="addressTableHeadRowCity headRow">Ciudad</div>
        <div className="addressTableHeadRowPostalCode headRow">
          Codigo_Postal
        </div>
        <div className="addressTableHeadRowCountry headRow">Pais</div>
        <div className="addressTableHeadRowCreate headRow">Creado</div>
      </div>
      <div className="addressTableBody">
        {address && address.length > 0 ? (
          address.map((addressItem) => (
            <div key={addressItem.ID_address} className="addressTableBodyRow">
              <div className="addressTableBodyRowName">
                {addressItem.user_name} {addressItem.last_name}
              </div>
              <div className="addressTableBodyRowStreet">
                {addressItem.address}
              </div>
              <div className="addressTableBodyRowNumber">
                {addressItem.street_number}
              </div>
              <div className="addressTableBodyRowFloor">
                {addressItem.floor === null ? "N/A" : addressItem.floor}
              </div>
              <div className="addressTableBodyRowLadderDoor">
                {addressItem.ladder_door === null
                  ? "N/A"
                  : addressItem.ladder_door}
              </div>
              <div className="addressTableBodyRowCity">{addressItem.city}</div>
              <div className="addressTableBodyRowPostalCode">
                {addressItem.postal_code}
              </div>
              <div className="addressTableBodyRowCountry">
                {addressItem.country}
              </div>
              <div className="addressTableBodyRowCreate">
                {GetNormalizaDate(addressItem.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="noResult">No hay direcciónes disponibles</div>
        )}
      </div>
    </section>
  );
};
