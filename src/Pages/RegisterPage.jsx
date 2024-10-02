import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Register } from "../Components/Forms/Register/Register.jsx";
const URL = import.meta.env.VITE_URL;

export const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Registro sastifactorio:", responseData.message);

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
          title: `Registro creado con exito! `,
        });
      } else {
        const errorData = await response.json();
        console.error("Error al crear el usuario:", errorData);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  };
  return <Register onSubmit={handleRegisterSubmit} />;
};
