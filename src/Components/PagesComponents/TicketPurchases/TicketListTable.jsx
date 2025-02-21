import { useUser } from "../../../Context/AutContext.jsx";
import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { DeleteTicketModal } from "./DeleteTicketModal.jsx";
import { MoreTicket } from "./MoreTicket.jsx";
import "./TicketListTable.css";

export const TicketListTable = ({ ticket, deleteTicket }) => {
  const token = useUser();

  const statusTranslations = {
    pending: "Pendiente",
    sent: "Enviado",
    cancelled: "Cancelado",
  };

  return (
    <section id="customer_table" className="ticketTable">
      <div className="ticketTableHead">
        <div className="ticketTableHeadRef headRow">Ref_OR</div>
        <div className="ticketTableHeadRowName headRow">Nombre</div>
        <div className="ticketTableHeadRowProduct headRow">Producto</div>
        <div className="ticketTableHeadRowPrice headRow">Precio</div>
        <div className="ticketTableHeadRowCuantity headRow">Cantidad</div>
        <div className="TicketTableHeadRowTotalPrice headRow">Total</div>
        <div className="ticketTableHeadRowStatus headRow">Estado</div>
        <div className="ticketTableHeadRowCreate headRow">Creado</div>
        <div className="ticketTableHeadRowActions headRow">Acciones</div>
      </div>
      <div className="ticketTableBody">
        {ticket && ticket.length > 0 ? (
          ticket.map((ticketItems) => (
            <div key={ticketItems.ID_ticket} className="ticketTableBodyRow">
              <div className="ticketTableBodyRowRef">{ticketItems.ref_OR}</div>
              <div className="ticketTableBodyRowName">
                {ticketItems.user_name} {ticketItems.last_name}
              </div>
              <div className="ticketTableBodyRowProduct">
                {ticketItems.name}
              </div>
              <div className="ticketTableBodyRowPrice">
                {ticketItems.product_price} €
              </div>{" "}
              <div className="ticketTableBodyRowCuantity">
                {ticketItems.product_amount} u
              </div>
              <div className="ticketTableBodyRowTotalPrice">
                {ticketItems.total_amount} €
              </div>
              <div
                className={`ticketTableBodyRowStatus ${ticketItems.status.toLowerCase()}`}
              >
                {statusTranslations[ticketItems.status.toLowerCase()] ||
                  ticketItems.status}
              </div>
              <div className="ticketTableBodyRowCreate">
                {GetNormalizaDate(ticketItems.createdAt).toLocaleDateString()}
              </div>
              <div className="ticketTableBodyRowActions">
                <MoreTicket ticket={ticketItems} />
                <DeleteTicketModal
                  id={ticketItems.ID_ticket}
                  onDelete={deleteTicket}
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
