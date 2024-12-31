import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useShipmentList = (token) => {
  const [listShipment, setListShipment] = useState([]);
  const [initialShipmentsList, setInitialShipmentsList] = useState([]);
  const [filteredShipmentList, setFilteredShipmentList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getShipmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listShipment]);

  useEffect(() => {
    if (filteredShipmentList.length > 0) {
      sortUsers(filteredShipmentList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getShipmentList = async () => {
    try {
      const response = await fetch(`${URL}/shipment/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListShipment(responseData.data);
        setInitialShipmentsList(responseData.data);
        setFilteredShipmentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de envios:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de envios",
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/shipment/search?searchTerm=${searchTerm}`,
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
        setListShipment(responseData.data);
        setFilteredShipmentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Búsqueda fallida:", errorData);
      }
    } catch (error) {
      console.error("Error al buscar un envio:", error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredShipmentList([...initialShipmentsList]);
    }
  };

  const applyFilters = () => {
    let filtered = listShipment;

    if (selectedFilters.length > 0) {
      filtered = listShipment.filter((shipment) => {
        // Verifica si coincide con algún filtro seleccionado
        return selectedFilters.includes(shipment.status);
      });
    }

    setFilteredShipmentList(filtered);
    sortUsers(filtered);
  };

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredShipmentList(list);
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
      default:
        break;
    }

    setFilteredShipmentList(sortedList);
  };

  const addShipment = async () => {
    try {
      await getShipmentList();
    } catch (error) {
      console.error("Error al agregar un envio:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar un envio",
      });
    }
  };

  const deleteShipment = async (ID_shipment) => {
    try {
      setListShipment((prevOrder) =>
        prevOrder.filter((shipment) => shipment.ID_shipment !== ID_shipment)
      );
      await getShipmentList();
    } catch (error) {
      console.error("Error al eliminar la envio:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar la envio",
      });
    }
  };
  const updateShipment = async (updatedShipment) => {
    setListShipment((prevList) =>
      prevList.map((shipment) =>
        shipment.ID_shipment === updatedShipment.ID_shipment
          ? { ...shipment, ...updatedShipment }
          : shipment
      )
    );

    setFilteredShipmentList((prevList) =>
      prevList.map((shipment) =>
        shipment.ID_shipment === updatedShipment.ID_shipment
          ? { ...shipment, ...updatedShipment }
          : shipment
      )
    );
    await getShipmentList();
  };

  const activeShipment = (ID_shipment) => {
    setListShipment((prevList) =>
      prevList.map((shipment) =>
        shipment.ID_shipment === ID_shipment
          ? { ...shipment, active: !shipment.active }
          : shipment
      )
    );
    setFilteredShipmentList((prevList) =>
      prevList.map((shipment) =>
        shipment.ID_shipment === ID_shipment
          ? { ...shipment, active: !shipment.active }
          : shipment
      )
    );
  };
  return {
    filteredShipmentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addShipment,
    deleteShipment,
    updateShipment,
    activeShipment,
  };
};
