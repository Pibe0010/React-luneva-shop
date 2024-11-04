import { Inputdate } from "../../Inputs/inputdate.jsx";

export const UpdateOfferFormModal = ({
  discount_rate,
  setDiscount_rate,
  start_date,
  setStart_date,
  ending_date,
  setEnding_date,
}) => {
  return (
    <>
      <div className="input-container">
        <label htmlFor="discount_rate">
          <input
            placeholder="Descuento"
            id="discount_rate"
            name="discount_rate"
            type="number"
            className="updateOffer-input"
            onChange={(e) => setDiscount_rate(e.target.value)}
            value={discount_rate}
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="start_date">
          <Inputdate
            value={start_date}
            onChange={(dateArray) => {
              if (dateArray && dateArray[0]) {
                setStart_date(dateArray[0].toLocaleDateString("en-CA"));
              }
            }}
            className="updateOffer-input"
            name="start_date"
            id="start_date"
            placeholder={start_date}
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="ending_date">
          <Inputdate
            value={ending_date}
            onChange={(dateArray) => {
              if (dateArray && dateArray[0]) {
                setEnding_date(dateArray[0].toLocaleDateString("en-CA"));
              }
            }}
            className="updateOffer-input"
            id="ending_date"
            name="ending_date"
            placeholder={ending_date}
          />
        </label>
      </div>
    </>
  );
};
