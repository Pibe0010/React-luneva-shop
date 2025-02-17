import { useState } from "react";
import { useUser } from "../../../Context/AutContext.jsx";
import { useTicketUserList } from "../../../Hooks/PagesHooks/useTicketUserList.js";
import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./TicketUser.css";

export const TickectUser = ({ setActiveModal }) => {
  const token = useUser();
  const { listTicketUser } = useTicketUserList(token);
  const [selectedDate, setSelectedDate] = useState(null);

  // Obtener fechas únicas de creación
  const uniqueDates = [
    ...new Set(
      (listTicketUser || []).map((ticket) =>
        new Date(ticket.createdAt).toLocaleDateString()
      )
    ),
  ];

  // Filtrar tickets según la fecha seleccionada
  const currentOrderTickets = selectedDate
    ? listTicketUser.filter(
        (ticket) =>
          new Date(ticket.createdAt).toLocaleDateString() === selectedDate
      )
    : [];

  // Calcular totales
  const subtotal = currentOrderTickets.reduce(
    (acc, product) =>
      acc + parseFloat(product.product_price) * product.product_amount,
    0
  );
  const totalDiscount = currentOrderTickets.reduce(
    (acc, product) =>
      acc +
      (product.offer_discount
        ? (parseFloat(product.product_price) - product.offer_discount) *
          product.product_amount
        : 0),
    0
  );
  const shipping = currentOrderTickets.reduce(
    (acc, product) => acc + parseFloat(product.shipment_cost),
    0
  );
  const iva = subtotal * 0.21;
  const total = subtotal - totalDiscount + shipping + iva;

  return (
    <div className="modal-ticket">
      {uniqueDates.length === 0 ? (
        <div className="ticketUser-empty">
          <p>No hay tickets para mostrar</p>
          <button onClick={() => setActiveModal(null)}>Cancelar</button>
        </div>
      ) : (
        <>
          <div className="ticketUser-select-container">
            <select
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ticketUser-select"
            >
              <option value="" className="ticketUser-option">
                Selecciona una fecha
              </option>
              {uniqueDates.map((date) => (
                <option key={date} value={date} className="ticketUser-option">
                  {date}
                </option>
              ))}
            </select>
          </div>

          {currentOrderTickets.length > 0 && (
            <section className="ticketUser-container">
              <h1 className="ticketUser-title">Factura de compra</h1>
              <ol className="ticketUser-list">
                <li className="ticketUser-item">
                  {currentOrderTickets.map((ticket) => (
                    <div
                      key={ticket.ID_ticket}
                      className="ticketUser-item-body"
                    >
                      <p>
                        <span>Producto:</span>
                        {ticket.name}
                      </p>
                      <p>
                        <span>Precio:</span>
                        {ticket.product_price}€
                      </p>
                      <p>
                        <span>Cantidad:</span>
                        {ticket.product_amount}uds
                      </p>
                    </div>
                  ))}
                </li>
              </ol>

              <div className="ticketUser-summary">
                <p>Subtotal: {subtotal.toFixed(2)}€</p>
                <p>IVA (21%): {iva.toFixed(2)}€</p>
                <p>Costo de envío: {shipping.toFixed(2)}€</p>
                <p>Descuento total: {totalDiscount.toFixed(2)}€</p>
                <h3>Total a pagar: {total.toFixed(2)}€</h3>
              </div>
              <div className="ticketUser-final">
                <p className="ticketUser-date">
                  Fecha de compra:{" "}
                  {GetNormalizaDate(
                    currentOrderTickets[0]?.createdAt
                  ).toLocaleString()}
                </p>
                <h2 className="ticketUser-title-final">
                  ¡Gracias por su compra!
                </h2>
                <h3>LUNEVASHOP</h3>
              </div>
            </section>
          )}
          <button onClick={() => setActiveModal(null)}>Cancelar</button>
        </>
      )}
    </div>
  );
};
