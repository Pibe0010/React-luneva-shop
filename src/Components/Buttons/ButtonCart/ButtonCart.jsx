import "./ButtonCart.css";

export const ButtonCart = ({ name, className, onClick }) => {
  return (
    <button className={`Btn ${className}`} onClick={onClick}>
      {name}
    </button>
  );
};
