import { useUser } from "../../../Context/AutContext.jsx";
import { DeleteShipmentModel } from "./DeleteShipmentModel.jsx";
import { MoreShipment } from "./MoreShipment.jsx";
import { UpdateShipment } from "./UpdateShipment.jsx";
import "./ShipmentListTable.css";

export const ShipmentListTable = ({
  shipment,
  updateShipment,
  deleteShipment,
}) => {
  const token = useUser();

  const statusTranslations = {
    pending: "Pendiente",
    sent: "Enviado",
    cancelled: "Cancelado",
  };

  return (
    <section id="customer_table" className="shipmentTable">
      <div className="shipmentTableHead">
        <div className="shipmentTableHeadRowRef headRow">Envio</div>
        <div className="shipmentTableHeadRowRef headRow">Orden</div>
        <div className="shipmentTableHeadRowName headRow">Nombre</div>
        <div className="shipmentTableHeadRowEmail headRow">E-mail</div>
        <div className="shipmentTableHeadRowProduct headRow">Producto</div>
        <div className="shipmentTableHeadRowCuantity headRow">Cantidad</div>
        <div className="shipmentTableHeadRowStatus headRow">Estado</div>
        <div className="shipmentTableHeadRowActions headRow">Acciones</div>
      </div>
      <div className="shipmentTableBody">
        {shipment && shipment.length > 0 ? (
          shipment.map((shipmentItem) => (
            <div
              key={shipmentItem.ID_shipment}
              className="shipmentTableBodyRow"
            >
              <div className="shipmentTableBodyRowRef">
                {shipmentItem.ref_SH}
              </div>
              <div className="shipmentTableBodyRowRef">
                {shipmentItem.ref_OR}
              </div>
              <div className="shipmentTableBodyRowName">
                {shipmentItem.user_name} {shipmentItem.last_name}
              </div>
              <div className="shipmentTableBodyRowEmail">
                {shipmentItem.email}
              </div>
              <div className="shipmentTableBodyRowProduct">
                {shipmentItem.name}
              </div>
              <div className="shipmentTableBodyRowCuantity">
                {shipmentItem.product_amount} u
              </div>
              <div
                className={`shipmentTableBodyRowStatus ${shipmentItem.status}`}
              >
                {statusTranslations[shipmentItem.status]}
              </div>
              <div className="shipmentTableBodyRowActions">
                <MoreShipment shipment={shipmentItem} />
                <UpdateShipment
                  id={shipmentItem.ID_shipment}
                  onUpdateShipment={updateShipment}
                  shipmentData={shipmentItem}
                  formTypes="shipment"
                />
                <DeleteShipmentModel
                  id={shipmentItem.ID_shipment}
                  onDelete={deleteShipment}
                  token={token}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="noResult">No hay envios disponibles</div>
        )}
      </div>
    </section>
  );
};
