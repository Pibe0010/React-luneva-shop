import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const ActivateAccount = () => {
  const { registration_code } = useParams();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(true); // Estado para controlar la visibilidad de la imagen

  useEffect(() => {
    const validateRegistration = async () => {
      try {
        const response = await fetch(
          `${URL}/user/activate/${registration_code}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Cuenta validada con éxito:", responseData);
          handleSuccess();
        } else {
          handleValidationFailure();
        }
      } catch (error) {
        console.error("Error durante la validación:", error);
        handleValidationFailure();
      }
    };

    const handleSuccess = () => {
      setShowImage(true);
      Swal.fire({
        title: "¡Validación exitosa!",
        text: "Ya puedes iniciar sesión.",
        icon: "success",
        allowOutsideClick: false,
      }).then((result) => {
        if (
          result.isConfirmed ||
          result.dismiss === Swal.DismissReason.overlay ||
          result.dismiss === Swal.DismissReason.esc ||
          result.dismiss === Swal.DismissReason.close
        ) {
          navigate("/login");
        }
      });
    };

    const handleValidationFailure = () => {
      setShowImage(true);
      Swal.fire({
        title: "¡Cuenta ya validada!",
        text: "Ya tienes la cuenta validada, inicia sesión",
        icon: "warning",
        allowOutsideClick: false,
      }).then((result) => {
        if (
          result.isConfirmed ||
          result.dismiss === Swal.DismissReason.overlay ||
          result.dismiss === Swal.DismissReason.esc ||
          result.dismiss === Swal.DismissReason.close
        ) {
          navigate("/login");
        }
      });
    };

    validateRegistration();
  }, [registration_code, navigate]);
  return (
    <>
      {showImage && (
        <img
          src="/img/logo.png"
          alt="Logo Luneva Shop"
          style={{ width: "100%", height: "100vh" }}
        />
      )}
    </>
  );
};
