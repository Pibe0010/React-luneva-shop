import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../Hooks/UseLocalStorage.js";
import { getUserDataToken } from "../Services/GetUserDataToken.js";

// Creamos los contextos
export const AuthContext = createContext();
export const RoleContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("session", "");
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Extrae el rol del usuario
    if (user) {
      const { role } = getUserDataToken(user);
      setRole(role);
    }

    return () => {};
  }, [user, setUser]);
  return (
    <AuthContext.Provider value={{ user, setUser, userInfo, setUserInfo }}>
      <RoleContext.Provider value={{ role, setRole }}>
        {children}
      </RoleContext.Provider>
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(AuthContext).user;
// eslint-disable-next-line react-refresh/only-export-components
export const useSetUser = () => useContext(AuthContext).setUser;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => useContext(AuthContext).userInfo;
// eslint-disable-next-line react-refresh/only-export-components
export const useSetUserInfo = () => useContext(AuthContext).setUserInfo;

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => useContext(RoleContext).role;
// eslint-disable-next-line react-refresh/only-export-components
export const useSetRole = () => useContext(RoleContext).setRole;
