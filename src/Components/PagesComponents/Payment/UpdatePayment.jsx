import Swal from "sweetalert2";
import { useUser } from "../../../Context/AutContext.jsx";
import { DinamicFormWrapper } from "../../Forms/DinamicFormModal/DinamicFormWrapper.jsx";
const URL = import.meta.env.VITE_URL;

export const UpdatePayment = ({
  paymentData,
  formTypes,
  onUpdatePayment,
  id,
}) => {
  const token = useUser();

  const handleButtonUpdateShipment = async (formData) => {
    try {
      const response = await fetch(`${URL}/payment/update/status/${id}`, {
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

        onUpdatePayment(responseData.data);

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
          title: "Pago actualizado con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("El pago no ha podido ser actualizado:", errorData);
      }
    } catch (error) {
      console.error("Error durante la actualización de el pago:", error);
    }
  };

  return (
    <DinamicFormWrapper
      productData={paymentData}
      onSubmit={handleButtonUpdateShipment}
      formTypes={formTypes}
    />
  );
};
