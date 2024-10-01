import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resetPasswordUserSchema } from "../../../Schema/Error/AuthSchema.js";
import "./ResetPasswordForm.css";
import { EyePassword } from "../../EyePassword/EyePassword.jsx";

export const ResetPasswordForm = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = { newPassword, repeatPassword };

    // Validar los datos con Joi
    const { error } = resetPasswordUserSchema.validate(data);

    // Si hay un error, lo establecemos en el estado para mostrarlo
    if (error) {
      setErrorMessages(error.details[0].message);
      return;
    }

    // Si no hay errores de validación, enviar los datos
    onSubmit(data);
  };

  // Limpiar los errores
  useEffect(() => {
    if (errorMessages) {
      const timer = setTimeout(() => {
        setErrorMessages("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessages]);

  return (
    <section className="resetPassword-container">
      <div className="resetPass-container">
        <div className="resetPass-heading">Cambiar contraseña</div>
        <form className="resetPass-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="newPassword">
              <input
                placeholder="Password"
                id="newPassword"
                name="newPassword"
                type="password"
                className="resetPass-input"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
              <EyePassword idInput="newPassword" />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="repeatPassword">
              <input
                placeholder="Repitir password"
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                className="resetPass-input"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
              <EyePassword idInput="repeatPassword" />
            </label>
          </div>
          {errorMessages && <p className="resetPass-error">{errorMessages}</p>}
          <input
            value="Cambiar contraseña"
            type="submit"
            className="resetPass-button"
          />
        </form>
        <span className="resetPass-link">
          <Link to="/login">Login</Link>
        </span>
      </div>
    </section>
  );
};
