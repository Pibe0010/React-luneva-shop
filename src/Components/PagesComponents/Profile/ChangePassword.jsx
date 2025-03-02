import { useState } from "react";
import { EyePassword } from "../../EyePassword/EyePassword.jsx";
import "./ChangePassword.css";
import { changePasswordSchema } from "../../../Schema/Error/CreateSchema.js";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const ChangePassword = ({ setActiveModal, token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswoirdChange = async (data) => {
    try {
      const response = await fetch(`${URL}/user/changePassword`, {
        method: "PUT",
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
          title: "Contraseña cambiada con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("Mensaje de contacto fallida:", errorData);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cambiar la contraseña.. Por favor, intenta nuevamente.",
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

  const handleChangePassword = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = {
      currentPassword,
      newPassword,
    };

    // Eliminar campos vacíos o undefined
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] === undefined) {
        delete data[key];
      }
    });

    // Validar los datos con Joi
    const { error } = changePasswordSchema.validate(data);

    // Si hay un error, lo establecemos
    if (error) {
      console.log(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handlePasswoirdChange(data);

    // Limpiar los campos del formulario
    setCurrentPassword("");
    setNewPassword("");

    setActiveModal(null);
  };

  return (
    <div className="modal">
      <h2>Cambiar contraseña </h2>
      <form onSubmit={handleChangePassword}>
        <div className="profile-input-container">
          <input
            id="password"
            type="password"
            name="currentPassword"
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Contraseña actual"
          />
          <EyePassword className="profile-eye" idInput="password" />
        </div>
        <div className="profile-input-container">
          <input
            id="password2"
            type="password"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder=" Cambiar contraseña"
          />
          <EyePassword className="profile-eye" idInput="password2" />
        </div>
        <button>Guardar</button>
        <button onClick={() => setActiveModal(null)}>Cancelar</button>
      </form>
    </div>
  );
};
