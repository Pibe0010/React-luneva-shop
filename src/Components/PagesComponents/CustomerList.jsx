/* import { useUser } from "../../Context/AutContext.jsx"; */
import { MoreInfo } from "../InfoModal/MoreInfo.jsx";
import "./CustomerList.css";

export const CustomerList = ({ customer }) => {
  /* const token = useUser(); */
  const nameComplete = `${customer.user_name} ${customer.last_name}`;
  const active = customer.active ? "Activo" : "Inactivo";
  const activeColor = customer.active ? "green" : "red";
  const activeClass = customer.active ? "active" : "inactive";
  const addressConcatenated = customer.address
    ? `C/ ${customer.address} Nro.${customer.street_number}, Piso. ${customer.floor}, Puerta. ${customer.ladder_door}, Codigo Postal. ${customer.postal_code}, Pais. ${customer.country}, Cuidad. ${customer.city}`
    : "Dirección no disponible";

  const moreInfoFields = [
    { label: "Nombre", value: nameComplete, id: "element_customer_name" },
    { label: "Teléfono", value: customer.phone, id: "element_customer_phone" },
    { label: "Email", value: customer.email, id: "element_customer_email" },
    {
      label: "Dirección",
      value: addressConcatenated,
      id: "element_customer_address",
    },
    {
      label: "Estado",
      value: active,
      id: "element_customer_active",
      color: activeColor,
    },
  ];

  const modalIds = {
    idModalContainer: "customerModalContainer",
    idModalHeader: "customerModalHeader",
    idModalTitle: "customerModalTitle",
    idModalBody: "customerModalBody",
    idModalFooter: "customerModalFooter",
    idModalBtnClose: "customerModalBtnClose",
    classState: "font-bold",
  };

  return (
    <>
      <div id="element_customer_subtitle" className="mainInsideSub">
        <p className="refTitle">Nombre: {nameComplete}</p>
      </div>

      <p className="mainInsideSub">
        <strong>Email: </strong> {customer.email}
      </p>
      <p className="mainInsideSub">
        <strong>Teléfono: </strong> {customer.phone}
      </p>
      <p className="mainInsideSub">
        <strong>Estado: </strong>{" "}
        <span className={activeClass}>
          {customer.active ? "Activo" : "Inactivo"}
        </span>
      </p>

      <span className="main_actions">
        <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
      </span>
    </>
  );
};
