import "./CheckboxProduct.css";

export const CheckboxProduct = ({ active, setActive }) => {
  return (
    <label className="checkbox-wrapper">
      <input
        type="checkbox"
        checked={active}
        name="active"
        onChange={() => setActive(!active)}
        id="checkbox"
        required
      />
      <div className="checkmark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M20 6L9 17L4 12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <span className="label">Activar Producto</span>
    </label>
  );
};
