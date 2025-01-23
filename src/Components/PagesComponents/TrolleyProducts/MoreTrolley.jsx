import { Link } from "react-router-dom";
import "./MoreTrolley.css";

export const MoreTrolley = () => {
  return (
    <button className="moreTrolley-btn">
      <Link to="/trolley" className="moreTrolley-cart">
        Ver carrito
      </Link>
    </button>
  );
};
