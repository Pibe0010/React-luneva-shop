import Swal from "sweetalert2";
import { DinamicFormWrapper } from "../../Forms/DinamicFormModal/DinamicFormWrapper.jsx";
import { useUser } from "../../../Context/AutContext.jsx";
const URL = import.meta.env.VITE_URL;

export const UpdateProduct = ({ id, productData, onUpdateProduct }) => {
  const token = useUser();

  const handleButtonUpdateProduct = async (formData) => {
    try {
      const response = await fetch(`${URL}/product/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Producto actualizado correctamente", responseData);

        onUpdateProduct(responseData.data);

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
          title: "Producto actualizado con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("El producto no ha podido ser actualizado:", errorData);
      }
    } catch (error) {
      console.error("Error durante la actualización del producto:", error);
    }
  };

  return (
    <DinamicFormWrapper
      productData={productData}
      onSubmit={handleButtonUpdateProduct}
    />
  );
};
