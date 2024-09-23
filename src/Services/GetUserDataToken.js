import { jwtDecode } from "jwt-decode";

export const getUserDataToken = (token) => {
  try {
    // Decodificamos el token
    const decodedToken = jwtDecode(token);

    // Rxtraemos los datos del token
    const { ID_user, user_name, last_name, role } = decodedToken;

    return { ID_user, user_name, last_name, role };
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
