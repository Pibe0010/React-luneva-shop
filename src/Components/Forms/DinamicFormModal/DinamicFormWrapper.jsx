import { useState } from "react";
import { DinamicFormModal } from "../UpdateProduct/DinamicFormModal.jsx";
import "./DinamicFormWrapper.css";

export const DinamicFormWrapper = ({ productData, onSubmit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="addProductBtn">
        <img
          src="/Icons/pending_actions.svg"
          alt="Icono de actualizar producto"
        />
      </button>

      {showModal && (
        <DinamicFormModal
          onSubmit={onSubmit}
          show={showModal}
          productData={productData}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
