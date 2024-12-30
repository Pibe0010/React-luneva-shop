import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./TicketList.css";

export const TicketList = ({ ticket }) => {
  const nameComplete = `${ticket.user_name} ${ticket.last_name} `;

  return (
    <>
      <div id="element_ticket_subtitle" className="mainInsideSub">
        <p className="refTitle">Ref_OR: {ticket.ref_OR}</p>
      </div>
      <p className="mainInsideSub">
        <strong>Nombre: </strong> {nameComplete}
      </p>
      <p className="mainInsideSub">
        <strong>Producto: </strong> {ticket.name}
      </p>

      <p className="mainInsideSub">
        <strong>Precio: </strong> {ticket.price} €
      </p>
      <p className="mainInsideSub">
        <strong>Cantidad: </strong> {ticket.product_amount} u
      </p>
      <p className="mainInsideSub">
        <strong>Creado: </strong>{" "}
        {GetNormalizaDate(ticket.createdAt).toLocaleDateString()}
      </p>
    </>
  );
};
