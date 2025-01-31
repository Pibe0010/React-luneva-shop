import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const ImageUser = ({
  setActiveModal,
  setUser,
  token,
  updateUserProfile,
}) => {
  const handleImageUpload = async (formData) => {
    try {
      const response = await fetch(`${URL}/user/update`, {
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

        updateUserProfile(responseData.data);

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
          "Actualización de imagen del usuario fallida:",
          errorData
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la imagen del usuario. Por favor, intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error. Por favor, intentalo nuevamente.",
      });
    }
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
      const formData = new FormData();
      formData.append("avatar", file);
      handleImageUpload(formData);
    };
    reader.readAsDataURL(file);
    setActiveModal(null);
  };

  return (
    <div className="modal">
      <h2>Cambiar foto de perfil</h2>
      <form encType="multipart/form-data" onSubmit={handlePhotoChange}>
        <input type="file" accept="image/*" />
        <button>Guardar</button>
        <button onClick={() => setActiveModal(null)}>Cancelar</button>
      </form>
    </div>
  );
};
