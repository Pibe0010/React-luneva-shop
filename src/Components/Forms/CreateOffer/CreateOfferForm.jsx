import { useUser } from "../../../Context/AutContext.jsx";
import { useUnsignedProductOffer } from "../../../Hooks/PagesHooks/useUnsignedProductOffer.js";

export const CreateOfferForm = ({
  products,
  setProducts,
  discount_rate,
  setDiscount_rate,
  start_date,
  setStart_date,
  ending_date,
  setEnding_date,
  reload,
}) => {
  const token = useUser();
  const unsignedProduct = useUnsignedProductOffer(token, reload);

  return (
    <>
      <div className="input-container">
        <label htmlFor="ID_product">
          <select
            id="ID_product"
            name="ID_product"
            type="select"
            className="createProduct-input"
            onChange={(e) => setProducts(e.target.value)}
            value={products}
            required
          >
            <option value="" disabled>
              Selecciona un Jabon
            </option>
            {unsignedProduct?.map((product) => (
              <option key={product.ID_product} value={product.ID_product}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="discount_rate">
          <input
            placeholder="Descuento"
            id="discount_rate"
            name="discount_rate"
            type="number"
            className="createProduct-input"
            value={discount_rate}
            onChange={(e) => setDiscount_rate(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="start_date">
          <input
            placeholder="Inicio"
            id="start_date"
            name="start_date"
            type="date"
            className="createProduct-input"
            value={start_date}
            onChange={(e) => setStart_date(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="ending_date">
          <input
            placeholder="Fin"
            id="ending_date"
            name="ending_date"
            type="date"
            className="createProduct-input"
            value={ending_date}
            onChange={(e) => setEnding_date(e.target.value)}
            required
          />
        </label>
      </div>
    </>
  );
};
