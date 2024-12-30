import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const DeleteTicketModal = ({ onDelete, id, token }) => {
  const handleTicketDelete = async () => {
    const confirmButtonText = onDelete ? "Eliminar" : "Cancelar";
    const confirmButtonColor = onDelete ? "#dc3545" : "#28a745";
    const confirmationMessage = onDelete
      ? `¿Quieres Eliminar el ticket?`
      : `¿Quieres Cancelar la ticket?`;

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
        const response = await fetch(`${URL}/Ticket/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
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
          console.log("Ticket eliminado correctamente", responseData);

          onDelete(responseData.data);

          const successMessage = `Ticket eliminado con éxito`;

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
        } else {
          Swal.fire({
            icon: "error",
            text: "El ticket no ha sido cancelada",
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

  return (
    <div>
      <button className="delete-btn" onClick={handleTicketDelete}>
        <img
          className="delete-icon"
          src="/Icons/cancel.svg"
          alt="Borrar producto"
        />
      </button>
    </div>
  );
};
