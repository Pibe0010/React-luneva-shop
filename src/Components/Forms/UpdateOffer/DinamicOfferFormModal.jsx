import { useEffect, useState } from "react";
import { updateOfferSchema } from "../../../Schema/Error/UpdateSchema.js";
import { UpdateOfferFormModal } from "./UpdateOfferFormModal.jsx";
import "./DinamicOfferFormModal.css";

export const DinamicOfferFormModal = ({
  onSubmit,
  onClose,
  productData,
  className,
}) => {
  const [discount_rate, setDiscount_rate] = useState("");
  const [start_date, setStart_date] = useState("");
  const [ending_date, setEnding_date] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  // Actualizar los valores de los estados locales cuando productData cambie
  useEffect(() => {
    if (productData) {
      setDiscount_rate(productData.discount_rate || "");
      setStart_date(productData.start_date || "");
      setEnding_date(productData.ending_date || "");
    }
  }, [productData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = {
      discount_rate,
      start_date,
      ending_date,
    };

    // Validar los datos con Joi
    const { error } = updateOfferSchema.validate(data);

    // Si hay un error, lo establecemos en el estado para mostrarlo
    if (error) {
      setErrorMessages(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    onSubmit(data);

    // Limpio los campos
    setDiscount_rate("");
    setStart_date("");
    setEnding_date("");

    // Cierro el modal
    onClose();
  };

  // Limpiar los errores
  useEffect(() => {
    if (errorMessages) {
      const timer = setTimeout(() => {
        setErrorMessages("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessages]);

  return (
    <section className="updateOffer-container">
      <div className={`update-container ${className}`}>
        <div className="updateOffer-heading"></div>
        <form className="updateOffer-form" onSubmit={handleSubmit}>
          <UpdateOfferFormModal
            discount_rate={discount_rate}
            setDiscount_rate={setDiscount_rate}
            start_date={start_date}
            setStart_date={setStart_date}
            ending_date={ending_date}
            setEnding_date={setEnding_date}
          />
          <div className="updateOffer-buttons">
            <input
              value="Actualizar"
              type="submit"
              className="updateOffer-button"
            />
            <button className="updateOffer-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
          {errorMessages && (
            <p className="updateOffer-error">{errorMessages}</p>
          )}
        </form>
      </div>
    </section>
  );
};
