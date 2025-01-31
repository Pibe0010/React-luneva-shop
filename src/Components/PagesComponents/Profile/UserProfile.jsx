import { useEffect, useState } from "react";
import ProfileGood from "/Icons/photo_camera_60dp_434343_FILL0_wght400_GRAD0_opsz48.svg";
import "./UserProfile.css";
import { ProfileCard } from "../../Card/ProfileCard.jsx";
import { useProfile } from "../../../Hooks/PagesHooks/useProfile.js";
import { ImageUser } from "./ImageUser.jsx";
import { updateUserSchema } from "../../../Schema/Error/UpdateSchema.js";
import { PhoneUserUpdated } from "./PhoneUserUpdated.jsx";
import { EmailUserUpdated } from "./EmailUserUpdated.jsx";
import { UserNameUpdated } from "./UserNameUpdated.jsx";
import { Contact } from "./Contact.jsx";
const URL = import.meta.env.VITE_URL;

export const UserProfile = ({ token }) => {
  const { listUserProfile, updatedUserProfile, addUserProfile } =
    useProfile(token);
  const [user, setUser] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [user_name, setUser_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setUser(listUserProfile);
  }, [listUserProfile]);

  const handleChange = (e) => {
    e.preventDefault();

    // Datos a validar
    const data = {
      user_name,
      last_name,
      email,
      phone,
    };

    // Eliminar campos vacíos o undefined
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] === undefined) {
        delete data[key];
      }
    });
    console.log(data);
    // Validar los datos con Joi
    const { error } = updateUserSchema.validate(data);

    // Si hay un error, lo establecemos
    if (error) {
      console.log(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    updatedUserProfile(data);

    // Limpiar los campos del formulario
    setUser_name("");
    setLast_name("");
    setEmail("");
    setPhone("");

    setActiveModal(null);
  };

  const imageUrl = user.avatar
    ? `${URL}/uploads/users/${user.ID_user}/${user.avatar}`
    : ProfileGood;

  const statusTranslete = user.active === 1 ? "Activo" : "Inactivo";

  const renderModal = () => {
    switch (activeModal) {
      case "avatar":
        return (
          <ImageUser
            setActiveModal={setActiveModal}
            setUser={setUser}
            token={token}
            updateUserProfile={addUserProfile}
          />
        );
      case "name":
        return (
          <UserNameUpdated
            setActiveModal={setActiveModal}
            setUser_name={setUser_name}
            setLast_name={setLast_name}
            handleChange={handleChange}
          />
        );
      case "email":
        return (
          <EmailUserUpdated
            setActiveModal={setActiveModal}
            setEmail={setEmail}
            handleChange={handleChange}
          />
        );
      case "phone":
        return (
          <PhoneUserUpdated
            setActiveModal={setActiveModal}
            setPhone={setPhone}
            handleChange={handleChange}
          />
        );
      case "contact":
        return <Contact setActiveModal={setActiveModal} token={token} />;
      default:
        return null;
    }
  };

  return (
    <section className="user-profile">
      <div className="profile-header">
        <div className="photo-container">
          <img src={imageUrl} alt="Foto de perfil" className="profile-photo" />
          <button
            className="edit-button"
            onClick={() => setActiveModal("avatar")}
          >
            Cambiar foto
          </button>
        </div>
        <h1>{`${user.user_name} ${user.last_name}`}</h1>
        <div className="profile-info">
          <span>E-mail:</span>
          <p className="profile-email">{user.email}</p>
          <span>Teléfono:</span>
          <p className="profile-phone"> +34 {user.phone}</p>
        </div>
        <div className="profile-status-container">
          <span>Estado de la cuenta</span>
          <p className="profile-status">{statusTranslete}</p>
        </div>
      </div>

      <h2 className="profile-title">Configuraciones</h2>
      <div className="profile-buttons">
        <ProfileCard
          onClick={() => setActiveModal("name")}
          description="Nombre y apellido"
          name="Editar"
          url="/Icons/badge_60dp_666666_FILL0_wght400_GRAD0_opsz48.svg"
          alt="Editar nombre y apellido"
        />
        <ProfileCard
          onClick={() => setActiveModal("email")}
          description="E-mail"
          name="Editar"
          url="/Icons/mail_60dp_666666_FILL0_wght400_GRAD0_opsz48.svg"
          alt="Editar e-mail"
        />
        <ProfileCard
          onClick={() => setActiveModal("phone")}
          description="Teléfono"
          name="Editar"
          url="/Icons/phone_iphone_60dp_666666_FILL0_wght400_GRAD0_opsz48.svg"
          alt="Editar telefono"
        />

        <ProfileCard
          onClick={() => setActiveModal("contact")}
          description="Contactanos"
          name="Enviar"
          url="/Icons/contact_mail_60dp_666666_FILL0_wght400_GRAD0_opsz48.svg"
          alt="Contactanos"
        />
      </div>

      {activeModal && <div className="modal-overlay">{renderModal()}</div>}
    </section>
  );
};
