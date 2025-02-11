import { useState } from "react";
import { useUser } from "../../../Context/AutContext.jsx";
import { useAddressList } from "../../../Hooks/PagesHooks/useAddressList.js";
import { DeleteAddressModal } from "./DeleteaddressModal.jsx";
import "./InsertAddressExist.css";
import { SelectAddress } from "./SelectAddress.jsx";

export const InsertAddressExist = ({ show, onClose, nextAccess }) => {
  const token = useUser();
  const { listAddress, deleteAddress } = useAddressList(token);
  const [addAddress, setAddAddress] = useState(false);

  const showModal = show === true ? "showAdd" : "showOff";

  const selectAddress = () => {
    setAddAddress(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <section className={`shipping-address-container ${showModal}`}>
      <ol className="shipping-address">
        {listAddress.length > 0 ? (
          listAddress.map((address) => (
            <li
              key={address.ID_address}
              className="shipping-address-list-container"
            >
              <div className="shipping-address-list">
                <p>Calle</p>
                <p>Número</p>
                <p>Escalera</p>
                <p>Puerta</p>
                <p>Pais</p>
                <p>Codigo postal</p>
                <p>Cuidad</p>
                <p>Acciones</p>
              </div>
              <div className="shipping-address-body">
                <p>{address.address}</p>
                <p>{address.street_number}</p>
                <p>{address.floor}</p>
                <p>{address.ladder_door}</p>
                <p>{address.country}</p>
                <p>{address.postal_code}</p>
                <p>{address.city}</p>
                <div className="shipping-address-actions">
                  <DeleteAddressModal
                    id={address.ID_address}
                    onDelete={deleteAddress}
                    token={token}
                  />
                  <SelectAddress
                    nextAccess={nextAccess}
                    token={token}
                    id={address.ID_address}
                    select={addAddress}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="shipping-address-noResult">
            No hay direcciónes disponibles
          </div>
        )}
        <div className="shipping-address-footer">
          <button className="shipping-address-button" onClick={selectAddress}>
            Selecciónar
          </button>
          <button className="shipping-address-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </ol>
    </section>
  );
};
