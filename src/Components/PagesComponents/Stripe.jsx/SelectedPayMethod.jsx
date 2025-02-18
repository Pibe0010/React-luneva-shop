import { useEffect, useState } from "react";
import "./SelectedPayMethod.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../../../Context/AutContext.jsx";
import { ToastAlert } from "../../Alerts/ToastAlert.jsx";
import { newPaymentSchema } from "../../../Schema/Error/CreateSchema.js";
const URL = import.meta.env.VITE_URL;

export const SelectedPayMethod = () => {
  const token = useUser();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [nextAccess, setNextAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [payment_method, setPayment_method] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  console.log(payment_method);

  const methods = [
    {
      id: "1",
      icon: "/Icons/credit_card_40dp_666666_FILL0_wght400_GRAD0_opsz40.svg",
      text: "Tarjeta",
      method: "card",
    },
    {
      id: "2",
      icon: "/Icons/account_balance_40dp_666666_FILL0_wght400_GRAD0_opsz40.svg",
      text: "Transferecia",
      method: "trasfer",
    },
    {
      id: "3",
      icon: "/Icons/paypal-circle-svgrepo-com.svg",
      text: "PayPal",
      method: "Paypal",
    },
  ];
  const handleSelect = (method) => {
    setSelectedMethod((prev) => (prev?.id === method.id ? null : method));
    setPayment_method(method.method);
  };
  useEffect(() => {
    if (selectedMethod !== null) {
      setNextAccess(true);
    } else if (selectedMethod === null) {
      setNextAccess(false);
    }
  }, [selectedMethod]);

  const handlePayChange = async (data) => {
    try {
      const response = await fetch(`${URL}/payment/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Pago enviada sastifactorio:", responseData.message);
        setNextAccess(true);
        console.log("Pago enviada:", responseData.data);

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
          title: `Metodo selecionado con exito.`,
        });
      } else {
        const errorData = await response.json();
        console.error("Error al selecionar el pago:", errorData);

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
      console.error(
        "Error durante la inserciòn de el metododo de pago:",
        error
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = { payment_method };

    // Validar los datos con Joi
    const { error } = newPaymentSchema.validate(data);

    // Si hay un error, lo establecemos
    if (error) {
      setErrorMessage(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handlePayChange(data);

    // Limpiar los campos del formulario
    setPayment_method("");

    // Activo el botón de seguinte
    setIsConfirmed(true);
  };

  // Limpiar los errores
  useEffect(() => {
    if (errorMessage) {
      ToastAlert.fire({
        icon: "error",
        title: errorMessage,
      });
    }
  }, [errorMessage]);

  return (
    <section className="selected-pay-method">
      <h1 className="selected-pay-method-title">
        Selecciona el método de pago
      </h1>
      <form className="selected-pay-method-form">
        <ol className="selected-pay-method-list">
          {methods.map((payment) => (
            <li key={payment.id} onClick={() => handleSelect(payment)}>
              <img src={payment.icon} alt={`Icono ${payment.text}`} />
              <p>{payment.text}</p>
              <input
                type="checkbox"
                id={payment.id}
                checked={selectedMethod?.id === payment.id}
                readOnly
              />
            </li>
          ))}
        </ol>
      </form>
      <div>
        <button
          type="submit"
          onClick={nextAccess === false ? "" : handleSubmit}
          className={
            nextAccess === false
              ? "selected-pay-method-btn_inactive"
              : "selected-pay-method-button"
          }
        >
          Selecciónar
        </button>
        <Link
          to={isConfirmed ? "/Checkout" : "#"}
          className={isConfirmed ? "form-insert-address-next" : "btn_inactive"}
        >
          Siguiente
        </Link>
      </div>
      <p className="selected-pay-method-text">2/3</p>
    </section>
  );
};
