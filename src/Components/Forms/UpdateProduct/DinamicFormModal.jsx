import { useEffect, useState } from "react";
import { updateProductSchema } from "../../../Schema/Error/UpdateSchema.js";
import { UpdateProductFormModal } from "./UpdateProductFormModal.jsx";
import "./DinamicFormModal.css";

export const DinamicFormModal = ({ onSubmit, onClose, productData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  // Actualizar los valores de los estados locales cuando productData cambie
  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setStock(productData.Stock || "");
      setCategory(productData.category || "");
    }
  }, [productData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = { name, description, price, stock, category };

    // Validar los datos con Joi
    const { error } = updateProductSchema.validate(data);

    // Si hay un error, lo establecemos en el estado para mostrarlo
    if (error) {
      setErrorMessages(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    onSubmit(data);

    // Limpio los campos
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory("");

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
    <section className="updateProduct-container">
      <div className="update-container">
        <div className="updateProduct-heading"></div>
        <form className="updateProduct-form" onSubmit={handleSubmit}>
          <UpdateProductFormModal
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            stock={stock}
            setStock={setStock}
            category={category}
            setCategory={setCategory}
          />
          <div className="updateProduct-buttons">
            <input
              value="Actualizar"
              type="submit"
              className="updateProduct-button"
            />
            <button className="updateProduct-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
          {errorMessages && (
            <p className="updateProduct-error">{errorMessages}</p>
          )}
        </form>
      </div>
    </section>
  );
};
