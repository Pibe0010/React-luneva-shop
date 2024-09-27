import { useEffect, useState } from "react";
import { useSetUser, useUser, useUserInfo } from "../../Context/AutContext.jsx";
import { getUserDataToken } from "../../Services/GetUserDataToken.js";
import { getFullName } from "../../Services/getFullName.js";
import { NavLink } from "react-router-dom";
import { LogoutButton } from "./LogoutButton.jsx";
const URL = import.meta.env.VITE_URL;
import "./ProfileNav.css";

export const ProfileNav = ({
  isProfileOpen,
  setIsProfileOpen,
  setIsCartOpen,
  setIsMenuOpen,
}) => {
  const token = useUser();
  const setUser = useSetUser();
  const userInfo = useUserInfo();
  const [userData, setUserData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (token && !userInfo) {
      // Obtener datos del usuario desde el token solo si no hay datos en userInfo
      const userDataFromToken = getUserDataToken(token);
      setUserData(userDataFromToken);
    } else if (userInfo) {
      // Si ya hay datos en userInfo, usarlos
      setUserData(userInfo);
    }
  }, [token, userInfo]);

  const toggleDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    if (!isProfileOpen) {
      setIsCartOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "./profile.svg";
  };

  return (
    <nav className="profileNavContainer">
      <button
        className={`dropdown-toggle btn-profile ${isProfileOpen ? "open" : ""} ${isClicked ? "clicked" : ""}`}
        onClick={() => {
          toggleDropdown();
          handleClick();
        }}
      >
        {userData && (
          <img
            className="avatarProfileNav"
            src={
              userData.avatar
                ? `${URL}/uploads/image/${userData.id_user}/${userData.avatar}`
                : "/Icons/ProfileGood.svg"
            }
            alt="Avatar del usuario"
            onError={handleError}
          />
        )}
      </button>

      <ul className={`menuProfileNav ${isProfileOpen ? "open" : ""}`}>
        {userData && (
          <li className="nameBar navli navLink" key="nameBar">
            <p className="nameProfileNav">
              {getFullName(userData.user_name, userData.last_name)}
            </p>
          </li>
        )}

        <NavLink
          exact="true"
          to="/Profile"
          className="btn-home navli btn-perfilNav"
          key="profile"
        >
          <p className="textProfileNav">Settings</p>
          <img
            className="iconProfileNavSettings iconProfileNav"
            src="/Icons/settings.svg"
            alt="Imagen de configuración de perfil"
          />
        </NavLink>
        <li className="btn-logout navli btn-perfilNav" key="logout">
          <LogoutButton setUser={setUser} />
          <img
            className="iconProfileNavLogout iconProfileNav"
            src="/Icons/iconLogout.svg"
            alt="Imagen de configuración de perfil"
          />
        </li>
      </ul>
    </nav>
  );
};
