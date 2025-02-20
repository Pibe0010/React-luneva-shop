import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useOfferList = (token) => {
  const [listOffer, setListOffer] = useState([]);
  const [initialOfferList, setInitialOfferList] = useState([]);
  const [filteredOfferList, setFilteredOfferList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getOfferList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listOffer]);

  useEffect(() => {
    if (filteredOfferList.length > 0) {
      sortUsers(filteredOfferList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getOfferList = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Agregar el token solo si existe (usuario autenticado)
      if (token) {
        headers.Authorization = `${token}`;
      }
      const response = await fetch(`${URL}/offers/list`, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        const responseData = await response.json();
        setListOffer(responseData.data);
        setInitialOfferList(responseData.data);
        setFilteredOfferList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de ofertas:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de ofertas",
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/offer/search?searchTerm=${searchTerm}`,
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
        setListOffer(responseData.data);
        setFilteredOfferList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Búsqueda fallida:", errorData);
      }
    } catch (error) {
      console.error("Error al buscar ofertas:", error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredOfferList([...initialOfferList]);
    }
  };

  const applyFilters = () => {
    let filtered = listOffer;

    if (selectedFilters.length > 0) {
      filtered = listOffer.filter((customer) => {
        let activeFilter = true;

        if (selectedFilters.includes("1") && selectedFilters.includes("0")) {
          activeFilter = true; // Muestra tanto activos como inactivos
        } else if (selectedFilters.includes("1")) {
          activeFilter = customer.active;
        } else if (selectedFilters.includes("0")) {
          activeFilter = !customer.active;
        }

        return activeFilter;
      });
    }

    setFilteredOfferList(filtered);
    sortUsers(filtered);
  };

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredOfferList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case "nombre-asc":
        sortedList.sort((a, b) => a.name.localeCompare(b.ame));
        break;
      case "nombre-desc":
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "discount-asc":
        sortedList.sort((a, b) =>
          a.discount_rate.localeCompare(b.discount_rate)
        );
        break;
      case "discount-desc":
        sortedList.sort((a, b) =>
          b.discount_rate.localeCompare(a.discount_rate)
        );
        break;
      case "price-asc":
        sortedList.sort((a, b) => a.price.localeCompare(b.price));
        break;
      case "price-desc":
        sortedList.sort((a, b) => b.price.localeCompare(a.price));
        break;
      default:
        break;
    }

    setFilteredOfferList(sortedList);
  };

  const addOffer = async () => {
    try {
      await getOfferList();
    } catch (error) {
      console.error("Error al agregar una oferta:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar una oferta",
      });
    }
  };

  const deleteOffer = async (ID_offer) => {
    try {
      setListOffer((prevOffer) =>
        prevOffer.filter((offer) => offer.ID_offer !== ID_offer)
      );
      await getOfferList();
    } catch (error) {
      console.error("Error al eliminar la oferta:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar la oferta",
      });
    }
  };

  const updateOffer = async (updatedOffer) => {
    setListOffer((prevList) =>
      prevList.map((offer) =>
        offer.ID_offer === updatedOffer.ID_offer
          ? { ...offer, ...updatedOffer }
          : offer
      )
    );

    setFilteredOfferList((prevList) =>
      prevList.map((offer) =>
        offer.ID_offer === updatedOffer.ID_offer
          ? { ...offer, ...updatedOffer }
          : offer
      )
    );
    await getOfferList();
  };

  const activeOffer = (ID_offer) => {
    setListOffer((prevList) =>
      prevList.map((offer) =>
        offer.ID_offer === ID_offer
          ? { ...offer, active: !offer.active }
          : offer
      )
    );
    setFilteredOfferList((prevList) =>
      prevList.map((offer) =>
        offer.ID_offer === ID_offer
          ? { ...offer, active: !offer.active }
          : offer
      )
    );
  };

  return {
    filteredOfferList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addOffer,
    deleteOffer,
    updateOffer,
    activeOffer,
  };
};
