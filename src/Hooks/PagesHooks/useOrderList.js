import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useOrderList = (token) => {
  const [listOrder, setListOrder] = useState([]);
  const [initialOrderList, setInitialOrderList] = useState([]);
  const [filteredOrderList, setFilteredOrderList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listOrder]);

  useEffect(() => {
    if (filteredOrderList.length > 0) {
      sortUsers(filteredOrderList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getOrderList = async () => {
    try {
      const response = await fetch(`${URL}/order/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListOrder(responseData.data);
        setInitialOrderList(responseData.data);
        setFilteredOrderList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de ordenes:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de ordenes",
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/order/search?searchTerm=${searchTerm}`,
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
        setListOrder(responseData.data);
        setFilteredOrderList(responseData.data);
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
      setFilteredOrderList([...initialOrderList]);
    }
  };

  const applyFilters = () => {
    let filtered = listOrder;

    if (selectedFilters.length > 0) {
      filtered = listOrder.filter((order) => {
        // Verifica si el estado del pedido coincide con algún filtro seleccionado
        return selectedFilters.includes(order.status);
      });
    }

    setFilteredOrderList(filtered);
    sortUsers(filtered);
  };

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredOrderList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case "nombre-asc":
        sortedList.sort((a, b) =>
          a.name.localeCompare(b.name, { sensitivity: "base" })
        );
        break;
      case "nombre-desc":
        sortedList.sort((a, b) =>
          b.name.localeCompare(a.name, { sensitivity: "base" })
        );
        break;
      case "ref-asc":
        sortedList.sort((a, b) => a.ref_PR.localeCompare(b.ref_PR));
        break;
      case "ref-desc":
        sortedList.sort((a, b) => b.ref_PR.localeCompare(a.ref_PR));
        break;
      case "discount-asc":
        sortedList.sort((a, b) => a.product_discount - b.product_discount);
        break;
      case "discount-desc":
        sortedList.sort((a, b) => b.product_discount - a.product_discount);
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

    setFilteredOrderList(sortedList);
  };

  const addOrder = async () => {
    try {
      await getOrderList();
    } catch (error) {
      console.error("Error al agregar una orden:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar una orden",
      });
    }
  };

  const deleteOrder = async (ID_order) => {
    try {
      setListOrder((prevOrder) =>
        prevOrder.filter((order) => order.ID_order !== ID_order)
      );
      await getOrderList();
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar la orden",
      });
    }
  };

  const updateOrder = async (updatedOrder) => {
    setListOrder((prevList) =>
      prevList.map((order) =>
        order.ID_order === updatedOrder.ID_order
          ? { ...order, ...updatedOrder }
          : order
      )
    );

    setFilteredOrderList((prevList) =>
      prevList.map((order) =>
        order.ID_order === updatedOrder.ID_order
          ? { ...order, ...updatedOrder }
          : order
      )
    );
    await getOrderList();
  };

  const activeOrder = (ID_order) => {
    setListOrder((prevList) =>
      prevList.map((order) =>
        order.ID_order === ID_order
          ? { ...order, active: !order.active }
          : order
      )
    );
    setFilteredOrderList((prevList) =>
      prevList.map((order) =>
        order.ID_order === ID_order
          ? { ...order, active: !order.active }
          : order
      )
    );
  };
  return {
    filteredOrderList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addOrder,
    deleteOrder,
    updateOrder,
    activeOrder,
  };
};
