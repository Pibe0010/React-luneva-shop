import "./ShipmentList.css";

export const ShipmentList = ({ shipment }) => {
  const nameComplete = `${shipment.user_name} ${shipment.last_name} `;

  const statusTranslations = {
    pending: "Pendiente",
    sent: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };

  return (
    <>
      <div id="element_shipment_subtitle" className="mainShipmentInsideSub">
        <p className="refShipmentTitle">Envio: {shipment.ref_SH}</p>
      </div>

      <p className="mainShipmentInsideSub">
        <strong>Orden: </strong> {shipment.ref_OR}
      </p>
      <p className="mainShipmentInsideSub">
        <strong>Nombre: </strong> {nameComplete}
      </p>
      <p className="mainShipmentInsideSub">
        <strong>E-mail: </strong> {shipment.email}
      </p>
      <p className="mainShipmentInsideSub">
        <strong>Producto: </strong> {shipment.name}
      </p>
      <p className="mainShipmentInsideSub">
        <strong>Cantidad: </strong> {shipment.product_amount} u
      </p>
      <p className="mainShipmentInsideSub">
        <strong>Estado: </strong>{" "}
        <span
          className={`orderTableBodyRowStatus ${shipment.status.toLowerCase()}`}
        >
          {statusTranslations[shipment.status.toLowerCase()] || shipment.status}
        </span>
      </p>
    </>
  );
};
