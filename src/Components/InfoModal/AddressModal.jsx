import { InsertAddressExist } from "../PagesComponents/Shipping_address/InsertAddressExist.jsx";

export const AddressModal = ({ isOpen, onClose, nextAccess }) => {
  if (!isOpen) return null;
  return (
    <div className={`modal-add ${isOpen ? "" : "hidden"}`}>
      <InsertAddressExist nextAccess={nextAccess} onClose={onClose} />
    </div>
  );
};
