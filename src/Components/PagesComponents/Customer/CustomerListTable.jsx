import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import "./CustomerListTable.css";

export const CustomerListTable = ({ customer }) => {
  return (
    <section id="customer_table" className="customerTable">
      <div className="customerTableHead">
        <div className="customerTableHeadRowName headRow">Nombre</div>
        <div className="customerTableHeadRowLastName headRow">Apellido</div>
        <div className="customerTableHeadRowPhone headRow">Telefono</div>
        <div className="customerTableHeadRowEmail headRow">E-mail</div>
        <div className="customerTableHeadRowStatus headRow">Estado</div>
        <div className="customerTableHeadRowCreate headRow">Creado</div>
      </div>
      <div className="customerTableBody">
        {customer && customer.length > 0 ? (
          customer.map((customerItem) => (
            <div
              key={customerItem.ID_customer}
              className="customerTableBodyRow"
            >
              <div className="customerTableBodyRowName">
                {customerItem.user_name}
              </div>
              <div className="customerTableBodyRowLastName">
                {customerItem.last_name}
              </div>
              <div className="customerTableBodyRowPhone">
                {customerItem.phone}
              </div>
              <div className="customerTableBodyRowEmail">
                {customerItem.email}
              </div>
              <div
                className={`customerTableBodyRowStatus ${customerItem.active ? "active" : "inactive"}`}
              >
                {customerItem.active ? "Activo" : "Inactivo"}
              </div>
              <div className="customerTableBodyRowCreate">
                {GetNormalizaDate(customerItem.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="noResult">No hay clientes disponibles</div>
        )}
      </div>
    </section>
  );
};
