import { Link } from "react-router-dom";
import { FormAddress } from "../../Forms/InsertAddress/FormAddress.jsx";
import "./InnsertAddress.css";
import { useEffect, useState } from "react";
import { useUser } from "../../../Context/AutContext.jsx";
import Swal from "sweetalert2";
import { newShippingAddressSchema } from "../../../Schema/Error/CreateSchema.js";
import { AddressModal } from "../../InfoModal/AddressModal.jsx";
import { ToastAlert } from "../../Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const InsertAddress = () => {
  const token = useUser();
  const [address, setAddress] = useState("");
  const [street_number, setStreet_number] = useState("");
  const [floor, setFloor] = useState("");
  const [ladder_door, setLadder_door] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [nextAccess, setNextAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddressChange = async (data) => {
    try {
      const response = await fetch(`${URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Dirección enviada sastifactorio:", responseData.message);
        setNextAccess(true);
        console.log("Dirección enviada:", responseData.data);

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
          title: `Dirección enviada con exito.`,
        });
      } else {
        const errorData = await response.json();
        console.error("Error al añadir la dirección:", errorData);

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
      console.error("Error durante la inserciòn de la dirección:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = {
      address,
      street_number,
      floor,
      ladder_door,
      city,
      postal_code,
      country,
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] === undefined) {
        delete data[key];
      }
    });

    // Validar los datos con Joi
    const { error } = newShippingAddressSchema.validate(data);

    // Si hay un error, lo establecemos
    if (error) {
      setErrorMessage(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handleAddressChange(data);

    // Limpiar los campos del formulario
    setAddress("");
    setStreet_number("");
    setFloor("");
    setLadder_door("");
    setCity("");
    setPostal_code("");
    setCountry("");
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
    <section className="form-address-container">
      <h1 className="form-insert-address-title">Dirección de envió</h1>
      <p className="form-insert-address-description">
        Completa tu dirección de envio donde quieres recibir tu compra, o elije
        una existente.
      </p>
      <div className="form-insert-address-container">
        <FormAddress
          address={address}
          setAddress={setAddress}
          street_number={street_number}
          setStreet_number={setStreet_number}
          floor={floor}
          setFloor={setFloor}
          ladder_door={ladder_door}
          setLadder_door={setLadder_door}
          city={city}
          setCity={setCity}
          postal_code={postal_code}
          setPostal_code={setPostal_code}
          country={country}
          setCountry={setCountry}
          onSubmit={handleSubmit}
          handleClick={handleClick}
        />

        <AddressModal
          nextAccess={setNextAccess}
          isOpen={showModal}
          onClose={handleClose}
        />
      </div>
      <div>
        <Link
          to={nextAccess === false ? "#" : "/payments/method"}
          className={
            nextAccess === false ? "btn_inactive" : "form-insert-address-next"
          }
        >
          Siguiente
        </Link>
        <Link to="/products" className="form-insert-address-next">
          Productos
        </Link>
      </div>
      <p className="form-insert-address-page">1/3</p>
    </section>
  );
};
