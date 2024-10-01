import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ForgotPasswordForm } from "../Components/Forms/ForgotPassword/ForgotPasswordForm.jsx";
const URL = import.meta.env.VITE_URL;

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = async (data) => {
    try {
      const response = await fetch(`${URL}/user/forgot-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Correo enviado:", responseData);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
            navigate("/login");
          },
        });

        Toast.fire({
          icon: "success",
          title: "E-mail de recuperación enviodo !",
        });
      } else {
        const errorData = await response.json();
        console.error("Error al enviar el correo:", errorData.message);
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };
  return <ForgotPasswordForm onSubmit={handleForgotPassword} />;
};
