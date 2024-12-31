export const UpdateShipmentFormModal = ({ status, setStatus }) => {
  const pending = "Pendiente";
  const sent = "Enviado";
  const delivered = "Entregado";
  const cancelled = "Cancelado";

  return (
    <div className="input-container">
      <label htmlFor="shipment">
        <select
          id="shipment"
          name="shipment"
          type="select"
          className="updateOffer-input"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          required
        >
          <option value="" disabled>
            Selecciona un Estado
          </option>
          <option value="pending">{pending}</option>
          <option value="sent">{sent}</option>
          <option value="delivered">{delivered}</option>
          <option value="cancelled">{cancelled}</option>
        </select>
      </label>
    </div>
  );
};
