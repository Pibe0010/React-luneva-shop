import { Link } from "react-router-dom";
import "./ButtonCart.css";

export const ButtonCart = ({ name, className }) => {
  return (
    <Link to="/payments/address" className={`Btn ${className}`}>
      {name}
    </Link>
  );
};
