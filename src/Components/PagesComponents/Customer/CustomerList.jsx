import { GetNormalizaDate } from "../../../Services/GetNormalizaDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";
import "./CustomerList.css";

export const CustomerList = ({ customer }) => {
  const nameComplete = `${customer.user_name} ${customer.last_name}`;
  const active = customer.active ? "Activo" : "Inactivo";
  const activeColor = customer.active ? "green" : "red";
  const activeClass = customer.active ? "active" : "inactive";
  const date = GetNormalizaDate(customer.createdAt).toLocaleDateString();

  const moreInfoFields = [
    { label: "Nombre", value: nameComplete, id: "element_customer_name" },
    { label: "Teléfono", value: customer.phone, id: "element_customer_phone" },
    { label: "Email", value: customer.email, id: "element_customer_email" },
    {
      label: "Estado",
      value: active,
      id: "element_customer_active",
      color: activeColor,
    },
    {
      label: "Creado",
      value: date,
      id: "element_customer_address",
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
      <div id="element_customer_subtitle" className="mainCustomer-insideSub">
        <p className="refProductTitle">Nombre: {nameComplete}</p>
      </div>

      <p className="mainCustomer-insideSub">
        <strong>Email: </strong> {customer.email}
      </p>
      <p className="mainCustomer-insideSub">
        <strong>Teléfono: </strong> {customer.phone}
      </p>
      <p className="mainCustomer-insideSub">
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
