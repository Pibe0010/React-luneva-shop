import { Link } from "react-router-dom";

export const NavLinks = ({ url, className, name }) => {
  return (
    <li>
      <Link to={url} className={className}>
        {name}
      </Link>
    </li>
  );
};
