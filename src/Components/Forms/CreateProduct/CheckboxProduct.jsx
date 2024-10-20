import "./CheckboxProduct.css";

export const CheckboxProduct = ({ active, setActive }) => {
  return (
    <>
      <label className="checkBox-container">
        <input
          type="checkbox"
          id="checkbox"
          checked={active}
          name="active"
          className="createProduct-input"
          value={active}
          onChange={(e) => setActive(e.target.checked)}
          required
        />
        <div className="checkmark">
          <span className="off"></span>
          <span className="on"></span>
        </div>
      </label>
      <label className="label" htmlFor="checkbox">
        Activa Producto
      </label>
    </>
  );
};
