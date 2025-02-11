import Swal from "sweetalert2";
import "./SelectAddress.css";
import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_URL;
export const SelectAddress = ({ id, token, nextAccess, select }) => {
  const [selectedAddress, setSelectedAddress] = useState(false);

  const handleAddressChange = async (id) => {
    try {
      const response = await fetch(`${URL}/shipment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ ID_address: id }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Dirección enviada sastifactorio:", responseData.message);
        nextAccess(true);
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
          title: `Dirección enviada con exito.`,
        });
      } else {
        const errorData = await response.json();
        console.error("Error al añadir la dirección:", errorData);

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
      console.error("Error durante la inserciòn de la dirección:", error);
    }
  };

  useEffect(() => {
    if (selectedAddress && select) {
      handleAddressChange(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress, select, id]);

  return (
    <input
      type="checkbox"
      onChange={(e) => setSelectedAddress(e.target.checked)}
      checked={selectedAddress}
      name="address"
      id="address"
      className="select-address"
    />
  );
};
