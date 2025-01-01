import { useUser } from "../../../Context/AutContext.jsx";
import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { DeletePaymentModal } from "./DeletePaymentModal.jsx";
import { MorePayment } from "./MorePayment.jsx";
import "./PaymentListTable.css";
import { UpdatePayment } from "./UpdatePayment.jsx";

export const PaymentListTable = ({ payment, deletePayment, updatePayment }) => {
  const token = useUser();

  const statusTranslations = {
    pending: "Pendiente",
    paid: "Pagado",
    cancelled: "Cancelado",
  };

  return (
    <section id="customer_table" className="paymentTable">
      <div className="paymentTableHead">
        <div className="paymentTableHeadRef headRow">Ref_PM</div>
        <div className="paymentTableHeadRowName headRow">Nombre</div>
        <div className="paymentTableHeadRowProduct headRow">Producto</div>
        <div className="paymentTableHeadRowCuantity headRow">Cantidad</div>
        <div className="paymentTableHeadRowPrice headRow">Precio</div>
        <div className="paymentTableHeadRowPayment headRow">Pago</div>
        <div className="paymentTableHeadRowIva headRow">Iva</div>
        <div className="paymentTableHeadRowTotal headRow">Total</div>
        <div className="paymentTableHeadRowMethod headRow">Metodo</div>
        <div className="paymentTableHeadRowStatus headRow">Estado</div>
        <div className="paymentTableHeadRowCreate headRow">Emitido</div>
        <div className="paymentTableHeadRowUpdate headRow">Actualizado</div>
        <div className="paymentTableHeadRowActions headRow">Acciones</div>
      </div>
      <div className="paymentTableBody">
        {payment && payment.length > 0 ? (
          payment.map((paymentItem) => (
            <div key={paymentItem.ID_order} className="paymentTableBodyRow">
              <div className="paymentTableBodyRowRef">{paymentItem.ref_PM}</div>
              <div className="paymentTableBodyRowName">
                {paymentItem.user_name} {paymentItem.last_name}
              </div>
              <div className="paymentTableBodyRowProduct">
                {paymentItem.name}
              </div>
              <div className="paymentTableBodyRowCuantity">
                {paymentItem.product_amount} u
              </div>
              <div className="paymentTableBodyRowPrice">
                {paymentItem.product_price} €
              </div>

              <div className="paymentTableBodyRowPayment">
                {paymentItem.price} €
              </div>
              <div className="paymentTableBodyRowIva">
                {paymentItem.iva_payments} %
              </div>
              <div className="paymentTableBodyRowTotal">
                {paymentItem.total_amount} €
              </div>
              <div className="paymentTableBodyRowMethod">
                {paymentItem.payment_method}
              </div>
              <div
                className={`orderTableBodyRowStatus ${paymentItem.status.toLowerCase()}`}
              >
                {statusTranslations[paymentItem.status.toLowerCase()] ||
                  paymentItem.status}
              </div>
              <div className="paymentTableBodyRowCreate">
                {GetNormalizaDate(paymentItem.createdAt).toLocaleDateString()}
              </div>
              <div className="paymentTableBodyRowUpdate">
                {GetNormalizaDate(paymentItem.updatedAt).toLocaleDateString()}
              </div>
              <div className="paymentTableBodyRowActions">
                <MorePayment payment={paymentItem} />
                {/* <StatusOrderController
                    id={orderItem.ID_order}
                    isActive={orderItem.active}
                    activeOrder={activeOrder}
                    token={token}
                  />*/}
                <UpdatePayment
                  id={paymentItem.ID_payment}
                  onUpdatePayment={updatePayment}
                  paymentData={paymentItem}
                  formTypes="payment"
                />
                <DeletePaymentModal
                  id={paymentItem.ID_payment}
                  onDelete={deletePayment}
                  token={token}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="noResult">No hay pagos disponibles</div>
        )}
      </div>
    </section>
  );
};
