import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./TicketList.css";

export const TicketList = ({ ticket }) => {
  const nameComplete = `${ticket.user_name} ${ticket.last_name} `;

  return (
    <>
      <div id="element_ticket_subtitle" className="mainTicketInsideSub">
        <p className="refTicketTitle">Ref_OR: {ticket.ref_OR}</p>
      </div>
      <p className="mainTicketInsideSub">
        <strong>Nombre: </strong> {nameComplete}
      </p>
      <p className="mainTicketInsideSub">
        <strong>Producto: </strong> {ticket.name}
      </p>

      <p className="mainTicketInsideSub">
        <strong>Precio: </strong> {ticket.price} €
      </p>
      <p className="mainTicketInsideSub">
        <strong>Cantidad: </strong> {ticket.product_amount} u
      </p>
      <p className="mainTicketInsideSub">
        <strong>Creado: </strong>{" "}
        {GetNormalizaDate(ticket.createdAt).toLocaleDateString()}
      </p>
    </>
  );
};
