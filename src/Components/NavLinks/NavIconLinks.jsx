import { Link } from "react-router-dom";

export const NavIconLinks = ({ url, className, children }) => {
  return (
    <li>
      <Link to={url} className={className}>
        {children}
      </Link>
    </li>
  );
};
