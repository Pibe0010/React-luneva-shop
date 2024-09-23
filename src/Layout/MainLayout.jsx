import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AutContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Navbar } from "../Components/Navbar/Navbar.jsx";

export const MainLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mauseenter", Swal.stopTimer);
          toast.addEventListener("mauseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Registrate para comprar en Luneva Shop.",
      });
    }
  }, [user, navigate]);

  return (
    <div className="main-layout-container">
      <Navbar />
      <main className="main-leyout">{children}</main>
    </div>
  );
};
