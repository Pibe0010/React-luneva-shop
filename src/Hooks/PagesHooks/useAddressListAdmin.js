import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useAddressListAdmin = (token) => {
  const [listAddress, setListAddress] = useState([]);
  const [initialAddressList, setInitialAddressList] = useState([]);
  const [filteredAddressList, setFilteredAddressList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getAddressList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listAddress]);

  useEffect(() => {
    if (filteredAddressList.length > 0) {
      sortUsers(filteredAddressList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getAddressList = async () => {
    try {
      const response = await fetch(`${URL}/address/list/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListAddress(responseData.data);
        setInitialAddressList(responseData.data);
        setFilteredAddressList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de ordenes:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de direcciónes",
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/address/search?searchTerm=${searchTerm}`,
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
        setListAddress(responseData.data);
        setFilteredAddressList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Búsqueda fallida:", errorData);
      }
    } catch (error) {
      console.error("Error al buscar una direccion:", error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredAddressList([...initialAddressList]);
    }
  };

  const applyFilters = () => {
    let filtered = listAddress;

    if (selectedFilters.length > 0) {
      filtered = listAddress.filter((address) => {
        // Verifica si el estado del pedido coincide con algún filtro seleccionado
        return selectedFilters.includes(address.floor);
      });
    }

    setFilteredAddressList(filtered);
    sortUsers(filtered);
  };

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredAddressList(list);
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
      case "address-asc":
        sortedList.sort((a, b) => a.address.localeCompare(b.address));
        break;
      case "address-desc":
        sortedList.sort((a, b) => b.address.localeCompare(a.address));
        break;
      case "street_number-asc":
        sortedList.sort((a, b) => a.street_number - b.street_number);
        break;
      case "street_number-desc":
        sortedList.sort((a, b) => b.street_number - a.street_number);
        break;
      default:
        break;
    }

    setFilteredAddressList(sortedList);
  };

  const addAddress = async () => {
    try {
      await getAddressList();
    } catch (error) {
      console.error("Error al agregar una dirección:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar una direccción",
      });
    }
  };

  const deleteAddress = async (ID_address) => {
    try {
      setListAddress((prevOrder) =>
        prevOrder.filter((address) => address.ID_address !== ID_address)
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

  const updateAddress = async (updatedAddress) => {
    setListAddress((prevList) =>
      prevList.map((address) =>
        address.ID_address === updatedAddress.ID_address
          ? { ...address, ...updatedAddress }
          : address
      )
    );

    setFilteredAddressList((prevList) =>
      prevList.map((address) =>
        address.ID_address === updatedAddress.ID_address
          ? { ...address, ...updatedAddress }
          : address
      )
    );
    await getAddressList();
  };

  return {
    filteredAddressList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addAddress,
    deleteAddress,
    updateAddress,
  };
};
