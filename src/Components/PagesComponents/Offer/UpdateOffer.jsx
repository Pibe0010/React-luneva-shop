import Swal from "sweetalert2";
import { DinamicFormWrapper } from "../../Forms/DinamicFormModal/DinamicFormWrapper.jsx";
import { useUser } from "../../../Context/AutContext.jsx";
const URL = import.meta.env.VITE_URL;

export const UpdateOffer = ({ offerData, formTypes, onUpdateOffer, id }) => {
  const token = useUser();

  const handleButtonUpdateOffer = async (formData) => {
    try {
      const response = await fetch(`${URL}/offers/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Oferta actualizado correctamente", responseData);

        onUpdateOffer(responseData.data);

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
          title: "Oferta actualizado con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("La oferta no ha podido ser actualizado:", errorData);
      }
    } catch (error) {
      console.error("Error durante la actualización de la oferta:", error);
    }
  };

  return (
    <DinamicFormWrapper
      productData={offerData}
      onSubmit={handleButtonUpdateOffer}
      formTypes={formTypes}
    />
  );
};
