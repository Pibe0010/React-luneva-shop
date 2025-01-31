import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;

export const useProfile = (token) => {
  const [listUserProfile, setListUserProfile] = useState({});

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetch(`${URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListUserProfile(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener el usuario:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener el usuario",
      });
    }
  };

  const updatedUserProfile = async (data) => {
    try {
      const response = await fetch(`${URL}/customer/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },

        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(
          "Perfil actualizado satisfactoriamente:",
          responseData.data
        );
        updateUserProfile(responseData.data);

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
          title: "Perfil actualizado con éxito!",
        });
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el usuario:", errorData);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al actualizar el usuario",
      });
    }
  };

  const addUserProfile = async () => {
    try {
      await getUserProfile();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al actualizar el usuario",
      });
    }
  };

  const updateUserProfile = async (updatedUser) => {
    setListUserProfile((prevList = []) =>
      Array.isArray(prevList)
        ? prevList.map((user) =>
            user.ID_user === updatedUser.ID_user
              ? { ...user, ...updatedUser }
              : user
          )
        : []
    );

    await getUserProfile();
  };

  return {
    listUserProfile,
    addUserProfile,
    updateUserProfile,
    updatedUserProfile,
  };
};
