import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const usePaymentList = (token) => {
  const [listPayment, setListPayment] = useState([]);
  const [initialPaymentsList, setInitialPaymentsList] = useState([]);
  const [filteredPaymentList, setFilteredPaymentList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getPaymentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listPayment]);

  useEffect(() => {
    if (filteredPaymentList.length > 0) {
      sortUsers(filteredPaymentList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getPaymentList = async () => {
    try {
      const response = await fetch(`${URL}/payment/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setListPayment(responseData.data);
        setInitialPaymentsList(responseData.data);
        setFilteredPaymentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de pagos:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de pagos",
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/payment/search?searchTerm=${searchTerm}`,
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
        setListPayment(responseData.data);
        setFilteredPaymentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Búsqueda fallida:", errorData);
      }
    } catch (error) {
      console.error("Error al buscar un pago:", error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredPaymentList([...initialPaymentsList]);
    }
  };

  const applyFilters = () => {
    let filtered = listPayment;

    if (selectedFilters.length > 0) {
      filtered = listPayment.filter((payment) => {
        // Verifica si coincide con algún filtro seleccionado
        return selectedFilters.includes(payment.status);
      });
    }

    setFilteredPaymentList(filtered);
    sortUsers(filtered);
  };

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredPaymentList(list);
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
      case "pagos-asc":
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case "pagos-desc":
        sortedList.sort((a, b) => b.price - a.price);
        break;
      case "total-asc":
        sortedList.sort((a, b) => a.total_amount - b.total_amount);
        break;
      case "total-desc":
        sortedList.sort((a, b) => b.total_amount - a.total_amount);
        break;
      default:
        break;
    }

    setFilteredPaymentList(sortedList);
  };

  const addPayment = async () => {
    try {
      await getPaymentList();
    } catch (error) {
      console.error("Error al agregar un pago:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar un pago",
      });
    }
  };

  const deletePayment = async (ID_shipment) => {
    try {
      setListPayment((prevOrder) =>
        prevOrder.filter((shipment) => shipment.ID_shipment !== ID_shipment)
      );
      await getPaymentList();
    } catch (error) {
      console.error("Error al eliminar la envio:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar la envio",
      });
    }
  };
  const updatePayment = async (updatedPayment) => {
    setListPayment((prevList) =>
      prevList.map((payment) =>
        payment.ID_payment === updatedPayment.ID_payment
          ? { ...payment, ...updatedPayment }
          : payment
      )
    );

    setFilteredPaymentList((prevList) =>
      prevList.map((payment) =>
        payment.ID_payment === updatedPayment.ID_payment
          ? { ...payment, ...updatedPayment }
          : payment
      )
    );
    await getPaymentList();
  };

  const activePayment = (ID_payment) => {
    setListPayment((prevList) =>
      prevList.map((payment) =>
        payment.ID_payment === ID_payment
          ? { ...payment, active: !payment.active }
          : payment
      )
    );
    setFilteredPaymentList((prevList) =>
      prevList.map((payment) =>
        payment.ID_payment === ID_payment
          ? { ...payment, active: !payment.active }
          : payment
      )
    );
  };
  return {
    filteredPaymentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addPayment,
    deletePayment,
    updatePayment,
    activePayment,
  };
};
