import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useAddressList = (token) => {
  const [listAddress, setListAddress] = useState([]);

  useEffect(() => {
    getAddressList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddressList = async () => {
    try {
      const response = await fetch(`${URL}/address/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListAddress(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de dirección:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de dirección",
      });
    }
  };

  const addAddress = async () => {
    try {
      await getAddressList();
    } catch (error) {
      console.error("Error al agregar la dirección:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al añadir la dirección",
      });
    }
  };

  const deleteAddress = async (ID_address) => {
    try {
      setListAddress((prevTrolley) =>
        prevTrolley.filter((address) => address.ID_address !== ID_address)
      );
      await getAddressList();
    } catch (error) {
      console.error("Error al eliminar la dirección:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar la dirección",
      });
    }
  };

  return {
    listAddress,
    addAddress,
    deleteAddress,
  };
};
