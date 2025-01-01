export const UpdatePaymentFormModal = ({ status, setStatus }) => {
  const pending = "Pendiente";
  const paid = "Pagado";
  const cancelled = "Cancelado";

  return (
    <div className="input-container">
      <label htmlFor="payment_method">
        <select
          id="payment_method"
          name="payment_method"
          type="select"
          className="updateOffer-input"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          required
        >
          <option value="" disabled>
            Seleciona un estado
          </option>
          <option value="pending">{pending}</option>
          <option value="paid">{paid}</option>
          <option value="cancelled">{cancelled}</option>
        </select>
      </label>
    </div>
  );
};
