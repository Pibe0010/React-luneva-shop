import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useTicketUserList = (token) => {
  const [listTicketUser, setListTicketUser] = useState([]);

  useEffect(() => {
    getTicketUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTicketUserList = async () => {
    try {
      const response = await fetch(`${URL}/ticket/list/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListTicketUser(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de tickets:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de tickets",
      });
    }
  };

  const addTicketUser = async () => {
    try {
      await getTicketUserList();
    } catch (error) {
      console.error("Error al agregar el ticket:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al añadir el ticket",
      });
    }
  };

  const deleteTicketUser = async (ID_ticket) => {
    try {
      setListTicketUser((prevTrolley) =>
        prevTrolley.filter((ticket) => ticket.ID_ticket !== ID_ticket)
      );
      await getTicketUserList();
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar el ticket",
      });
    }
  };

  const updateTicketUser = async (updatedTicket) => {
    setListTicketUser((prevList) =>
      prevList.map((ticket) =>
        ticket.ID_ticket === updatedTicket.ID_ticket
          ? { ...ticket, ...updatedTicket }
          : ticket
      )
    );

    await getTicketUserList();
  };

  return {
    listTicketUser,
    addTicketUser,
    deleteTicketUser,
    updateTicketUser,
  };
};
