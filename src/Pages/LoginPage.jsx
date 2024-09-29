import { useNavigate } from "react-router-dom";
import { useSetUser } from "../Context/AutContext.jsx";
import { getUserDataToken } from "../Services/GetUserDataToken.js";
import Swal from "sweetalert2";
import { Login } from "../Components/Forms/Login/Login.jsx";
import { getFullName } from "../Services/getFullName.js";
const URL = import.meta.env.VITE_URL;

export const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const handleLoginSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Login sastifactorio:", responseData.message);

        const newToken = responseData.data;
        const { user_name, last_name } = getUserDataToken(newToken);
        setUser(newToken);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
            navigate("/");
          },
        });

        Toast.fire({
          icon: "success",
          title:
            `Bienvenid@ a Luneva Shop, ` +
            getFullName(`${user_name} ${last_name}`),
        });
      } else {
        const errorData = await response.json();
        console.error("Error al iniciar sesión:", errorData);

        if (errorData.code === "INTERNAL_SERVER_ERROR") {
          Swal.fire({
            icon: "error",
            title: "Cuenta inactiva",
            text: "Verifica tu correo electronico para activar tu cuenta.",
          });
        }

        if (errorData.code === "INVALID_CREDENTIALS") {
          Swal.fire({
            icon: "error",
            title: "Contraseña o Email incorrecto",
            text: "Verifica los datos ingresados.",
          });
          document.getElementById("password").value = "";
        }
      }
    } catch (error) {
      console.error("Error durante el login:", error);
    }
  };

  return <Login onSubmit={handleLoginSubmit} />;
};
