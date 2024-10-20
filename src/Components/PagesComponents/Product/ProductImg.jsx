import defaultProduct from "/Icons/imageProduct.svg";
import "./ProductImg.css";
import { useUser } from "../../../Context/AutContext.jsx";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const ProductImg = ({ images, id, onUpdateProduct }) => {
  const token = useUser();

  const handleImageUpload = async (file, imageName) => {
    const formData = new FormData();
    formData.append(imageName, file); // Asocia el archivo al campo correcto

    try {
      const response = await fetch(`${URL}/product/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(
          "Imagen del producto actualizada satisfactoriamente:",
          responseData
        );

        onUpdateProduct(responseData.data);
        console.log("Imagen del producto actualizada:", responseData.data);

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
          title: "Actualización realizada con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error(
          "Actualización de imagen del producto fallida:",
          errorData
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la imagen del producto. Por favor, intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error. Por favor, intenta nuevamente.",
      });
    }
  };

  const selectImage = async (imageName) => {
    const { value: file } = await Swal.fire({
      title: "Selecciona una imagen",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Sube tu foto de perfil",
      },
      showCancelButton: true,
      confirmButtonText: "Cambiar",
      cancelButtonText: "Cancelar",
      preConfirm: (file) => {
        return new Promise((resolve, reject) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              Swal.fire({
                title: "Foto del producto",
                imageUrl: e.target.result,
                imageAlt: "Foto del producto",
                showCancelButton: true,
                confirmButtonText: "Subir",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  resolve(file);
                } else {
                  reject("No file selected");
                }
              });
            };
            reader.readAsDataURL(file);
          } else {
            reject("No file selected");
          }
        });
      },
    });
    // Pasa el archivo y el nombre de la imagen a actualizar
    if (file) {
      handleImageUpload(file, imageName);
    } else {
      console.error("No se ha seleccionado ninguna imagen.");
    }
  };

  return (
    <section>
      <h3 className="title">Imagenes del jabon {`${images.name}`}</h3>
      <div className="img-figure">
        <section className="img-section">
          <button
            className="btn-selectProduct"
            onClick={() => selectImage("image_one")}
          >
            <img
              className="img-one"
              src={
                images.image_one
                  ? `${URL}/uploads/products/${id}/${images.image_one}`
                  : defaultProduct
              }
              alt="imagen uno"
            />
            <p className="img-title">Imagen 1</p>
          </button>
        </section>
        <section>
          <button
            className="btn-selectProduct"
            onClick={() => selectImage("image_two")}
          >
            <img
              className="img-two"
              src={
                images.image_two
                  ? `${URL}/uploads/products/${id}/${images.image_two}`
                  : defaultProduct
              }
              alt="imagen dos"
            />
            <p className="img-title">Imagen 2</p>
          </button>
        </section>
        <section>
          <button
            className="btn-selectProduct"
            onClick={() => selectImage("image_three")}
          >
            <img
              className="img-tree"
              src={
                images.image_tree
                  ? `${URL}/uploads/products/${id}/${images.image_tree}`
                  : defaultProduct
              }
              alt="imagen tres"
            />
            <p className="img-title">Imagen 3</p>
          </button>
        </section>
      </div>
    </section>
  );
};
