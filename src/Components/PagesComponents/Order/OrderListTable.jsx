import { useUser } from "../../../Context/AutContext.jsx";
import { DeleteOrderModal } from "./DeleteOrderModal.jsx";
import { MoreOrder } from "./MoreOrder.jsx";
/* import { StatusOrderController } from "./StatusOrderController.jsx"; */
/* import { UpdateOrder } from "./UpdateOrder.jsx"; */
import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./OrderListTable.css";

export const OrderListTable = ({ order, deleteOrder }) => {
  const token = useUser();

  const statusTranslations = {
    earring: "Pendiente",
    sent: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };

  return (
    <section id="customer_table" className="orderTable">
      <div className="orderTableHead">
        <div className="orderTableHeadRef headRow">Ref_OR</div>
        <div className="orderTableHeadRowName headRow">Nombre</div>
        <div className="orderTableHeadRowEmail headRow">E-mail</div>
        <div className="orderTableHeadRowProduct headRow">Producto</div>
        <div className="orderTableHeadRowPrice headRow">Precio</div>
        <div className="orderTableHeadRowCuantity headRow">Cantidad</div>
        <div className="orderTableHeadRowDiscount headRow">Descuento</div>
        <div className="orderTableHeadRowStatus headRow">Estado</div>
        <div className="orderTableHeadRowCreate headRow">Creado</div>
        <div className="orderTableHeadRowActions headRow">Acciones</div>
      </div>
      <div className="orderTableBody">
        {order && order.length > 0 ? (
          order.map((orderItem) => (
            <div key={orderItem.ID_order} className="orderTableBodyRow">
              <div className="orderTableBodyRowRef">{orderItem.ref_OR}</div>
              <div className="orderTableBodyRowName">
                {orderItem.user_name} {orderItem.last_name}
              </div>
              <div className="orderTableBodyRowEmail">{orderItem.email}</div>
              <div className="orderTableBodyRowProduct">{orderItem.name}</div>
              <div className="orderTableBodyRowPrice">{orderItem.price} €</div>
              <div className="orderTableBodyRowCuantity">
                {orderItem.product_amount} u
              </div>
              <div className="orderTableBodyRowDiscount">
                {orderItem.product_discount
                  ? `${orderItem.product_discount} €`
                  : "0 €"}
              </div>
              <div
                className={`orderTableBodyRowStatus ${orderItem.status.toLowerCase()}`}
              >
                {statusTranslations[orderItem.status.toLowerCase()] ||
                  orderItem.status}
              </div>
              <div className="orderTableBodyRowCreate">
                {GetNormalizaDate(orderItem.createdAt).toLocaleDateString()}
              </div>
              <div className="orderTableBodyRowActions">
                <MoreOrder order={orderItem} />
                {/* <StatusOrderController
                  id={orderItem.ID_order}
                  isActive={orderItem.active}
                  activeOrder={activeOrder}
                  token={token}
                /> 
                <UpdateOrder
                  id={orderItem.ID_order}
                  onUpdateOrder={updateOrder}
                  offerData={orderItem}
                  formTypes="order"
                />*/}
                <DeleteOrderModal
                  id={orderItem.ID_order}
                  onDelete={deleteOrder}
                  token={token}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="noResult">No hay ofertas disponibles</div>
        )}
      </div>
    </section>
  );
};
