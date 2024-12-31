import Swal from "sweetalert2";
import { DinamicFormWrapper } from "../../Forms/DinamicFormModal/DinamicFormWrapper.jsx";
import { useUser } from "../../../Context/AutContext.jsx";
const URL = import.meta.env.VITE_URL;

export const UpdateShipment = ({
  shipmentData,
  formTypes,
  id,
  onUpdateShipment,
}) => {
  const token = useUser();

  const handleButtonUpdateShipment = async (formData) => {
    try {
      const response = await fetch(`${URL}/shipment/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Envio actualizado correctamente", responseData);

        onUpdateShipment(responseData.data);

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
          title: "Envio actualizado con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("El envio no ha podido ser actualizado:", errorData);
      }
    } catch (error) {
      console.error("Error durante la actualización de el envio:", error);
    }
  };

  return (
    <DinamicFormWrapper
      productData={shipmentData}
      onSubmit={handleButtonUpdateShipment}
      formTypes={formTypes}
    />
  );
};
