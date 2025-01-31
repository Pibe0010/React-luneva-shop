import { useState } from "react";
import Swal from "sweetalert2";
import { userSupportSchema } from "../../../Schema/Error/CreateSchema.js";
const URL = import.meta.env.VITE_URL;

export const Contact = ({ setActiveModal, token }) => {
  const [user_name, setUser_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailUpload = async (data) => {
    console.log(data, "en el fetch");
    try {
      const response = await fetch(`${URL}/user/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Mensaje enviado satisfactoriamente:", responseData);

        console.log("Mensaje enviado:", responseData.data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "success",
          title: "Mensaje enviado con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("Mensaje de contacto fallida:", errorData);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo enviar el mensaje de contacto.. Por favor, intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error. Por favor, intentalo nuevamente.",
      });
    }
  };

  const handleEmailSend = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = {
      user_name,
      last_name,
      email,
      message,
    };

    console.log(data);
    // Validar los datos con Joi
    const { error } = userSupportSchema.validate(data);

    // Si hay un error, lo establecemos
    if (error) {
      console.log(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handleEmailUpload(data);

    // Limpiar los campos del formulario
    setUser_name("");
    setLast_name("");
    setEmail("");
    setMessage("");

    setActiveModal(null);
  };
  return (
    <div className="modal">
      <h2>Contactanos</h2>
      <form onSubmit={handleEmailSend}>
        <input
          type="text"
          onChange={(e) => setUser_name(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          onChange={(e) => setLast_name(e.target.value)}
          placeholder="Apellido"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <textarea
          className="contac-textarea"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensaje"
          rows="4"
          cols="50"
        ></textarea>
        <button>Guardar</button>
        <button onClick={() => setActiveModal(null)}>Cancelar</button>
      </form>
    </div>
  );
};
