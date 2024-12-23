import { useState } from "react";
import { DinamicFormModal } from "../UpdateProduct/DinamicFormModal.jsx";
import { DinamicOfferFormModal } from "../UpdateOffer/DinamicOfferFormModal.jsx";
import "./DinamicFormWrapper.css";

export const DinamicFormWrapper = ({
  productData,
  formTypes,
  onSubmit,
  reload,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(formTypes);

  const handleClickOpenProduct = () => {
    if (formType === "offer") {
      setFormType("offer");
      setShowModal(true);
    } else if (formType === "product") {
      setFormType("product");
      setShowModal(true);
    } else {
      setFormType();
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleClickOpenProduct} className="addProductBtn">
        <img
          src="/Icons/pending_actions.svg"
          alt="Icono de actualizar producto"
        />
      </button>

      {showModal && formType === "product" && (
        <DinamicFormModal
          onSubmit={onSubmit}
          show={showModal}
          productData={productData}
          onClose={handleCloseModal}
        />
      )}

      {showModal && formType === "offer" && (
        <DinamicOfferFormModal
          onSubmit={onSubmit}
          show={showModal}
          productData={productData}
          onClose={handleCloseModal}
          reload={reload}
        />
      )}
    </>
  );
};
