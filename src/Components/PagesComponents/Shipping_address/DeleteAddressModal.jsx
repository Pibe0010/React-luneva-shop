import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const DeleteAddressModal = ({ id, token, onDelete }) => {
  const handleAddressDelete = async () => {
    try {
      const response = await fetch(`${URL}/address/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Dirección enviada sastifactorio:", responseData.message);
        onDelete(responseData.data);
        console.log("Dirección enviada:", responseData.data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `Dirección borrada con exito.`,
        });
      } else {
        const errorData = await response.json();
        console.error("Error al borrar la dirección:", errorData);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: errorData.message,
        });
      }
    } catch (error) {
      console.error("Error durante el borrado de la dirección:", error);
    }
  };
  return (
    <button className="shipping-address-delete" onClick={handleAddressDelete}>
      <img
        className="shipping-address-delete-icon"
        src="/Icons/close_small_35dp_434343_FILL0_wght400_GRAD0_opsz40.svg"
        alt="Borrar producto"
      />
    </button>
  );
};
