import { useUser } from "../../../Context/AutContext.jsx";
import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { DeleteOfferModal } from "./DeleteOfferModal.jsx";
import { MoreOffer } from "./MoreOffer.jsx";
import { StatusOfferController } from "./StatusOfferController.jsx";
import { UpdateOffer } from "./UpdateOffer.jsx";
import "./OfferListTable.css";

export const OfferListTable = ({
  offer,
  updateOffer,
  deleteOffer,
  activeOffer,
}) => {
  const token = useUser();

  return (
    <section id="customer_table" className="offerTable">
      <div className="offerTableHead">
        <div className="offerTableHeadRowName headRow">Nombre</div>
        <div className="offerTableHeadRowPrice headRow">Precio</div>
        <div className="offerTableHeadRowDiscount headRow">Descuento</div>
        <div className="offerTableHeadRowStart headRow">Inicio</div>
        <div className="offerTableHeadRowEnd headRow">Fin</div>
        <div className="offerTableHeadRowStatus headRow">Estado</div>
        <div className="offerTableHeadRowActions headRow">Acciones</div>
      </div>
      <div className="offerTableBody">
        {offer && offer.length > 0 ? (
          offer.map((offerItem) => (
            <div key={offerItem.ID_offer} className="offerTableBodyRow">
              <div className="offerTableBodyRowName">{offerItem.name}</div>
              <div className="offerTableBodyRowPrice">{offerItem.price} €</div>
              <div className="offerTableBodyRowDiscount">
                {offerItem.discount_rate} €
              </div>
              <div className="offerTableBodyRowStart">
                {GetNormalizaDate(offerItem.start_date).toLocaleDateString()}
              </div>
              <div className="offerTableBodyRowEnd">
                {GetNormalizaDate(offerItem.ending_date).toLocaleDateString()}
              </div>
              <div
                className={`offerTableBodyRowStatus ${offerItem.active ? "active" : "inactive"}`}
              >
                {offerItem.active ? "Activo" : "Inactivo"}
              </div>
              <div className="offerTableBodyRowActions">
                <MoreOffer offer={offerItem} />
                <StatusOfferController
                  id={offerItem.ID_offer}
                  isActive={offerItem.active}
                  activeOffer={activeOffer}
                  token={token}
                />
                <UpdateOffer
                  id={offerItem.ID_offer}
                  onUpdateOffer={updateOffer}
                  offerData={offerItem}
                  formTypes="offer"
                />
                <DeleteOfferModal
                  id={offerItem.ID_offer}
                  onDelete={deleteOffer}
                  token={token}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="noResult">No hay ofertas disponibles</div>
        )}
      </div>
    </section>
  );
};
