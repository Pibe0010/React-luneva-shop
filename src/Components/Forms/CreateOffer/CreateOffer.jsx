import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { newOfferSchema } from "../../../Schema/Error/CreateSchema.js";
import { CreateOfferForm } from "./CreateOfferForm.jsx";
const URL = import.meta.env.VITE_URL;

export const CreateOffer = ({ onAddOffer, token }) => {
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState("");
  console.log(products);
  const [discount_rate, setDiscount_rate] = useState("");
  console.log(discount_rate);
  const [start_date, setStart_date] = useState("");
  console.log(start_date);
  const [ending_date, setEnding_date] = useState("");
  console.log(ending_date);
  const [errorMessages, setErrorMessages] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCreateProductSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${URL}/offers/register`, {
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
        onAddOffer(responseData.data);
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
          title: `Oferta Creado con exito.`,
        });

        setReload(!reload);
      } else {
        const errorData = await response.json();
        console.error("Error al crear una oferta:", errorData);

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
      console.error("Error durante la creacion de la oferta:", error);
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
    const data = {
      ID_product: products,
      discount_rate,
      start_date,
      ending_date,
    };

    // Validar los datos con Joi
    const { error } = newOfferSchema.validate(data);

    // Si hay un error, lo establecemos en el estado para mostrarlo
    if (error) {
      setErrorMessages(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handleCreateProductSubmit(data);

    // Limpio los campos
    setProducts("");
    setDiscount_rate("");
    setStart_date("");
    setEnding_date("");
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
    <>
      <button onClick={handleClickOpen} className="addProductBtn">
        <img
          src="/Icons/AddProduct-copy.svg"
          alt="Icono de actualizar producto"
        />
      </button>

      {showModal && (
        <section className="createProduct-container">
          <div className="create-container">
            <div className="createProduct-heading">Crear Oferta</div>
            <form className="createProduct-form" onSubmit={handleSubmit}>
              <CreateOfferForm
                products={products}
                setProducts={setProducts}
                discount_rate={discount_rate}
                setDiscount_rate={setDiscount_rate}
                start_date={start_date}
                setStart_date={setStart_date}
                ending_date={ending_date}
                setEnding_date={setEnding_date}
                reload={reload}
              />
              <div className="CreateProduct-buttons">
                <input
                  value="Crear Oferta"
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
