import { MoreInfo } from "../InfoModal/MoreInfo.jsx";

export const MoreCustomer = ({ customer }) => {
  // Concatena el nombre y los apellidos del cliente
  const nameComplete = `${customer.user_name} ${customer.last_name}`;

  // Si active es 1 que ponga activo si es 0 que muestre inactivo
  const active = customer.active ? "Activo" : "Inactivo";
  const activeColor = customer.active ? "green" : "red";
  //   const activeClass = customer.active ? 'active' : 'inactive';

  // Construye el contenido del modal con la información del usuario
  const addressConcatenated = customer.address
    ? `C/ ${customer.address} Nro.${customer.street_number}, Piso. ${customer.floor}, Puerta. ${customer.ladder_door}, Codigo Postal. ${customer.postal_code}, Pais. ${customer.country}, Cuidad. ${customer.city}`
    : "Dirección no disponible";

  // Lista de campos para crear la información del botón de más info
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
  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
