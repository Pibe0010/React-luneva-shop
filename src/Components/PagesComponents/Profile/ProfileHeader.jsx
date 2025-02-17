import Swal from "sweetalert2";
import { recoveryPasswordSchema } from "../../../Schema/Error/CreateSchema.js";
import { useUser } from "../../../Context/AutContext.jsx";
const URL = import.meta.env.VITE_URL;

export const ProfileHeader = ({
  user,
  statusTranslete,
  imageUrl,
  setActiveModal,
}) => {
  const token = useUser();

  const handleAddPasswoird = async (data) => {
    try {
      const response = await fetch(`${URL}/user/forgot-password`, {
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
          title: "Contraseña enviada a su emial con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("Recupeción de contraseña fallida:", errorData);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo enviar el email.. Por favor, intenta nuevamente.",
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

  const handleRecoveryPassword = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = {
      email: user.email,
    };

    // Eliminar campos vacíos o undefined
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] === undefined) {
        delete data[key];
      }
    });

    // Validar los datos con Joi
    const { error } = recoveryPasswordSchema.validate(data);

    // Si hay un error, lo establecemos
    if (error) {
      console.log(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    handleAddPasswoird(data);
  };

  return (
    <div className="profile-header">
      <div className="photo-container">
        <img src={imageUrl} alt="Foto de perfil" className="profile-photo" />
        <button
          className="edit-button"
          onClick={() => setActiveModal("avatar")}
        >
          Cambiar foto
        </button>
      </div>
      <h1>{`${user.user_name} ${user.last_name}`}</h1>
      <div className="profile-info">
        <span>E-mail:</span>
        <p className="profile-email">{user.email}</p>
        <span>Teléfono:</span>
        <p className="profile-phone"> +34 {user.phone}</p>
        <span>Recuperar contraseña:</span>
        <form className="profile-recovery" onSubmit={handleRecoveryPassword}>
          <input
            className="recovery-email"
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
          />
          <button className="recovery-button">Recuperar</button>
        </form>
      </div>
      <div className="profile-status-container">
        <span>Estado de la cuenta</span>
        <p className="profile-status">{statusTranslete}</p>
      </div>
    </div>
  );
};
