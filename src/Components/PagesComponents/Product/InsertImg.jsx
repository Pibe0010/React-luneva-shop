import { useState } from "react";
import { ProductImg } from "./ProductImg.jsx";
import "./InsertImg.css";

export const InsertImg = ({ id, product, onUpdateProduct }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const animationClas = showModal ? "modal-show" : "modal-hide";

  return (
    <>
      <button onClick={handleClickOpen} className="insertImg">
        <img
          src="/Icons/add_a_photo_31dp_434343_FILL0_wght400_GRAD0_opsz24.svg"
          alt="Insertar imagen"
        />
      </button>

      {showModal && (
        <div className="modal-product-image-container">
          <div className={`modal-product-content ${animationClas}`}>
            <ProductImg
              id={id}
              images={product}
              onUpdateProduct={onUpdateProduct}
            />
            <div className="modal-product-footer">
              <button
                className="close-modal-product-button"
                onClick={handleCloseModal}
              >
                cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
