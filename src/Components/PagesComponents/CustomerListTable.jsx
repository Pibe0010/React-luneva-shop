import "./CustomerListTable.css";
/* import { MoreCustomer } from "./MoreCustomer.jsx"; */

export const CustomerListTable = ({ customer }) => {
  return (
    <section id="customer_table" className="customerTable">
      <div className="customerTableHead">
        <div className="customerTableHeadRowName headRow">Nombre</div>
        <div className="customerTableHeadRowLastName headRow">Apellido</div>
        <div className="customerTableHeadRowPhone headRow">Telefono</div>
        <div className="customerTableHeadRowEmail headRow">E-mail</div>
        <div className="customerTableHeadRowStatus headRow">Estado</div>
        <div className="customerTableHeadRowActions headRow">Direccion</div>
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
              <div className="customerTableBodyRowActions">
                C/ {customerItem.address} Nro.{customerItem.street_number},
                Piso. {customerItem.floor}, Puerta. {customerItem.ladder_door},
                Codigo Postal. {customerItem.postal_code}, Pais.
                {customerItem.country}, Cuidad. {customerItem.city}
                {/* <MoreCustomer customer={customerItem} /> */}
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
