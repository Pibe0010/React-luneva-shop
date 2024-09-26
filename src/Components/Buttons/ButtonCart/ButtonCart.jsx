import "./ButtonCart.css";

export const ButtonCart = ({ name, className }) => {
  return <button className={`Btn ${className}`}>{name}</button>;
};
