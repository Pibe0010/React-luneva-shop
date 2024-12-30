import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useTicketList = (token) => {
  const [listTickets, setListTickets] = useState([]);
  const [initialTicketsList, setInitialTicketsList] = useState([]);
  const [filteredTicketsList, setFilteredTicketsList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getTicketList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listTickets]);

  useEffect(() => {
    if (filteredTicketsList.length > 0) {
      sortUsers(filteredTicketsList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getTicketList = async () => {
    try {
      const response = await fetch(`${URL}/ticket/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListTickets(responseData.data);
        setInitialTicketsList(responseData.data);
        setFilteredTicketsList(responseData.data);
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

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/ticket/search?searchTerm=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Busqueda exitosa:", responseData);
        setListTickets(responseData.data);
        setFilteredTicketsList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Búsqueda fallida:", errorData);
      }
    } catch (error) {
      console.error("Error al buscar una orden:", error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredTicketsList([...initialTicketsList]);
    }
  };

  const applyFilters = () => {
    let filtered = listTickets;

    if (selectedFilters.length > 0) {
      filtered = listTickets.filter((ticket) => {
        // Verifica si coincide con algún filtro seleccionado
        return selectedFilters.includes(ticket.status);
      });
    }

    setFilteredTicketsList(filtered);
    sortUsers(filtered);
  };

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredTicketsList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case "nombre-asc":
        sortedList.sort((a, b) =>
          a.user_name.localeCompare(b.user_name, { sensitivity: "base" })
        );
        break;
      case "nombre-desc":
        sortedList.sort((a, b) =>
          b.user_name.localeCompare(a.user_name, { sensitivity: "base" })
        );
        break;
      case "ref-asc":
        sortedList.sort((a, b) => a.ref_OR.localeCompare(b.ref_OR));
        break;
      case "ref-desc":
        sortedList.sort((a, b) => b.ref_OR.localeCompare(a.ref_OR));
        break;
      case "product_amount-asc":
        sortedList.sort((a, b) => a.product_amount - b.product_amount);
        break;
      case "product_amount-desc":
        sortedList.sort((a, b) => b.product_amount - a.product_amount);
        break;
      case "price-asc":
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedList.sort((a, b) => b.total_price - a.price);
        break;
      default:
        break;
    }

    setFilteredTicketsList(sortedList);
  };

  const addTicket = async () => {
    try {
      await getTicketList();
    } catch (error) {
      console.error("Error al agregar un ticket:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar un ticket",
      });
    }
  };

  const deleteTicket = async (ID_ticket) => {
    try {
      setListTickets((prevOrder) =>
        prevOrder.filter((ticket) => ticket.ID_ticket !== ID_ticket)
      );
      await getTicketList();
    } catch (error) {
      console.error("Error al eliminar la ticket:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar la ticket",
      });
    }
  };

  const updateTicket = async (updatedTicket) => {
    setListTickets((prevList) =>
      prevList.map((ticket) =>
        ticket.ID_ticket === updatedTicket.ID_ticket
          ? { ...ticket, ...updatedTicket }
          : ticket
      )
    );

    setFilteredTicketsList((prevList) =>
      prevList.map((ticket) =>
        ticket.ID_ticket === updatedTicket.ID_ticket
          ? { ...ticket, ...updatedTicket }
          : ticket
      )
    );
    await getTicketList();
  };

  const activeTicket = (ID_ticket) => {
    setListTickets((prevList) =>
      prevList.map((ticket) =>
        ticket.ID_ticket === ID_ticket
          ? { ...ticket, active: !ticket.active }
          : ticket
      )
    );
    setFilteredTicketsList((prevList) =>
      prevList.map((ticket) =>
        ticket.ID_ticket === ID_ticket
          ? { ...ticket, active: !ticket.active }
          : ticket
      )
    );
  };
  return {
    filteredTicketsList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addTicket,
    deleteTicket,
    updateTicket,
    activeTicket,
  };
};
