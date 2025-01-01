import { useEffect, useState } from "react";
import { UpdatePaymentFormModal } from "./UpdatePaymentFormModal.jsx";
import { updatePaymentStatusSchema } from "../../../Schema/Error/UpdateSchema.js";

export const DinamicPaymentFormModal = ({ onSubmit, onClose, productData }) => {
  const [status, setStatus] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  // Actualizar los valores de los estados locales cuando productData cambie
  useEffect(() => {
    if (productData) {
      setStatus(productData.status || "");
    }
  }, [productData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = {
      status: status,
    };

    // Validar los datos con Joi
    const { error } = updatePaymentStatusSchema.validate(data);

    // Si hay un error, lo establecemos en el estado para mostrarlo
    if (error) {
      setErrorMessages(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    onSubmit(data);
    console.log(data);

    // Limpio los campos
    setStatus("");

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
      <div className="update-container">
        <div className="updateOffer-heading"></div>
        <form className="updateOffer-form" onSubmit={handleSubmit}>
          <UpdatePaymentFormModal status={status} setStatus={setStatus} />
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
