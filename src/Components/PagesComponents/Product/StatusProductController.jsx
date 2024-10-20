import Swal from "sweetalert2";
import { CompletButton } from "../../Buttons/StatesBtn/CompletButton.jsx";
const URL = import.meta.env.VITE_URL;

export const StatusProductController = ({
  id,
  isActive,
  activeProduct,
  token,
}) => {
  const handleClick = async () => {
    const confirmButtonText = isActive ? "Desactivar" : "Activar";
    const confirmButtonColor = isActive ? "#dc3545" : "#28a745";
    const confirmationMessage = isActive
      ? `¿Quieres desactivar el producto?`
      : `¿Quieres activar el producto?`;

    const confirmed = await Swal.fire({
      title: "¿Estás seguro?",
      text: confirmationMessage,
      icon: "question",
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Sí, ${confirmButtonText}`,
    });

    if (confirmed.isConfirmed) {
      try {
        console.log(
          "Datos que se están enviando:",
          JSON.stringify({ active: !isActive })
        );
        const response = await fetch(`${URL}/product/toggleActivation/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ active: (!isActive).toString() }),
        });

        if (!response.ok) {
          console.error(
            "Error en la respuesta del servidor:",
            response.status,
            response.statusText
          );
        }

        if (response.ok) {
          const responseData = await response.json();
          const successMessage = responseData.isActive
            ? `Producto activado con éxito`
            : `Producto desactivado con éxito`;

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
            text: successMessage,
          });

          activeProduct(id, responseData.isActive);
        } else {
          Swal.fire({
            icon: "error",
            text: "Hubo un problema al realizar la operación",
          });
        }
      } catch (error) {
        console.error("Error al realizar la operación:", error);
        Swal.fire({
          icon: "error",
          text: "Hubo un problema al realizar la operación",
        });
      }
    }
  };

  return <CompletButton onClick={handleClick} />;
};
