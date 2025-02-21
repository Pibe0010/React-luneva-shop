import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreShipment = ({ shipment }) => {
  const statusTranslations = {
    pending: "Pendiente",
    sent: "Enviado",
    cancelled: "Cancelado",
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "royalblue";
      case "sent":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "status-default";
    }
  };

  const nameComplete = `${shipment.user_name} ${shipment.last_name} `;

  const moreInfoFields = [
    { label: "Envio", value: "" + shipment.ref_SH },
    { label: "Orden", value: "" + shipment.ref_OR },
    { label: "Nombre", value: "" + nameComplete },
    { label: "E-mail", value: "" + shipment.email },
    { label: "Teléfono", value: "" + shipment.phone },
    { label: "Producto", value: "" + shipment.name },
    { label: "Cantidad", value: "" + shipment.product_amount + " u." },
    {
      label: "Estado",
      value: "" + statusTranslations[shipment.status],
      color: getStatusClass(shipment.status),
    },
    { label: "Dirección", value: "" + shipment.address },
    { label: "Numero", value: "" + shipment.street_number },
    { label: "Piso", value: "" + shipment.floor },
    { label: "Puerta", value: "" + shipment.ladder_door },
    { label: "Ciudad", value: "" + shipment.city },
    { label: "Codigo Postal", value: "" + shipment.postal_code },
    { label: "Pais", value: "" + shipment.country },
  ];

  const modalIds = {
    classState: "font-bold",
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
