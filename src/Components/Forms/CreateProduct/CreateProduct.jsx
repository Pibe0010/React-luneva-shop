import { useEffect, useState } from "react";
import { newProductSchema } from "../../../Schema/Error/CreateSchema.js";
import { CreateProductForm } from "./CreateProductForm.jsx";
import "./CreateProduct.css";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const CreateProduct = ({ onAddProduct, token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCreateProductSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${URL}/product/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Producto creado sastifactorio:", responseData.message);
        onAddProduct(responseData.data);
        console.log("Producto agregado a la lista:", responseData.data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `Producto Creado con exito.`,
        });
      } else {
        const errorData = await response.json();
        console.error("Error al crear el producto:", errorData);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: errorData.message,
        });
      }
    } catch (error) {
      console.error("Error durante la creacion del producto:", error);
    }
  };

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = { name, description, price, stock, category, active };

    // Validar los datos con Joi
    const { error } = newProductSchema.validate(data);

    // Si hay un error, lo establecemos en el estado para mostrarlo
    if (error) {
      setErrorMessages(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handleCreateProductSubmit(data);

    // Limpio los campos
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory("");
    setActive(false);
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

  const animationClas = showModal ? "modal-show" : "modal-hide";

  return (
    <>
      <button onClick={handleClickOpen} className="addProductBtn">
        <img
          src="/Icons/AddProduct-copy.svg"
          alt="Icono de actualizar producto"
        />
      </button>

      {showModal && (
        <section className="createProduct-container">
          <div className={`create-container ${animationClas}`}>
            <div className="createProduct-heading">Crear Producto</div>
            <form className="createProduct-form" onSubmit={handleSubmit}>
              <CreateProductForm
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
                active={active}
                setActive={setActive}
              />
              <div className="CreateProduct-buttons">
                <input
                  value="Crear Producto"
                  type="submit"
                  className="createProduct-button"
                />
                <button
                  className="createProduct-button"
                  onClick={handleCloseModal}
                >
                  cancelar
                </button>
              </div>
              {errorMessages && (
                <p className="createProduct-error">{errorMessages}</p>
              )}
            </form>
          </div>
        </section>
      )}
    </>
  );
};
