import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const usePaymentListUser = (token) => {
  const [filteredPaymentListUser, setFilteredPaymentListUser] = useState([]);

  useEffect(() => {
    getPaymentListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getPaymentListUser = async () => {
    try {
      const response = await fetch(`${URL}/payment/list/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setFilteredPaymentListUser(responseData.data);
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

  const addPaymentuser = async () => {
    try {
      await getPaymentListUser();
    } catch (error) {
      console.error("Error al agregar un pago:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar un pago",
      });
    }
  };

  const deletePaymentuser = async (ID_shipment) => {
    try {
      setFilteredPaymentListUser((prevOrder) =>
        prevOrder.filter((shipment) => shipment.ID_shipment !== ID_shipment)
      );
      await getPaymentListUser();
    } catch (error) {
      console.error("Error al eliminar la envio:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar la envio",
      });
    }
  };
  const updatePaymentUser = async (updatedPayment) => {
    setFilteredPaymentListUser((prevList) =>
      prevList.map((payment) =>
        payment.ID_payment === updatedPayment.ID_payment
          ? { ...payment, ...updatedPayment }
          : payment
      )
    );

    setFilteredPaymentListUser((prevList) =>
      prevList.map((payment) =>
        payment.ID_payment === updatedPayment.ID_payment
          ? { ...payment, ...updatedPayment }
          : payment
      )
    );
    await getPaymentListUser();
  };

  return {
    filteredPaymentListUser,
    addPaymentuser,
    deletePaymentuser,
    updatePaymentUser,
  };
};
