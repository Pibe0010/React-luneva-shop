import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ResetPasswordForm } from "../Components/Forms/ResetPassword/ResetPasswordForm.jsx";
const URL = import.meta.env.VITE_URL;

export const ResetPassword = () => {
  const { registration_code } = useParams();
  const navigate = useNavigate();

  const handleResetPasswordSubmit = async (data) => {
    try {
      const response = await fetch(
        `${URL}/user/reset-password/${registration_code}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = response.json();
        console.log("contraseña cambiada con exito:", responseData);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            navigate("/login");
          },
        });

        Toast.fire({
          icon: "success",
          title: "Password restablecido!",
        });
      } else {
        const errorData = await response.json();
        console.error("restablecer contraseña a fallado:", errorData);
      }
    } catch (error) {
      console.error(
        "Error durante el restablacimiento de la contraseña:",
        error
      );
    }
  };
  return <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />;
};
