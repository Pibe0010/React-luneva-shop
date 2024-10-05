import { useState } from "react";
import { MoreInfoButton } from "../Buttons/StatesBtn/MoreInfoButton.jsx";
import { ModalComponent } from "../Buttons/StatesBtn/ModalComponent.jsx";

export const MoreInfo = ({ fields, modalIds }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <MoreInfoButton onClick={handleClick} />
      <ModalComponent
        show={showModal}
        onClose={handleClose}
        fields={fields}
        modalIds={modalIds}
      />
    </>
  );
};
