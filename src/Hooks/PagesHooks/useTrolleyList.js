import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useTrolleyList = (token) => {
  const [listTrolley, setListTrolley] = useState([]);

  useEffect(() => {
    getTrolleyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrolleyList = async () => {
    try {
      const response = await fetch(`${URL}/trolley/products/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListTrolley(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de productos",
      });
    }
  };

  const addTrolley = async () => {
    try {
      await getTrolleyList();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al añadir el producto al carrito",
      });
    }
  };

  const deleteTrolley = async (ID_trolley) => {
    try {
      setListTrolley((prevTrolley) =>
        prevTrolley.filter((trolley) => trolley.ID_trolley !== ID_trolley)
      );
      await getTrolleyList();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar el producto",
      });
    }
  };

  const updateTrolley = async (updatedTrolley) => {
    setListTrolley((prevList) =>
      prevList.map((cart) =>
        cart.ID_trolley === updatedTrolley.ID_trolley
          ? { ...cart, ...updatedTrolley }
          : cart
      )
    );

    await getTrolleyList();
  };

  const activeTrolley = (ID_trolley) => {
    setListTrolley((prevList) =>
      prevList.map((cart) =>
        cart.ID_trolley === ID_trolley
          ? { ...cart, active: !cart.active }
          : cart
      )
    );
  };
  return {
    listTrolley,
    addTrolley,
    deleteTrolley,
    updateTrolley,
    activeTrolley,
  };
};
