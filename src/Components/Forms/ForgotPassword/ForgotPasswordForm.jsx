import { useEffect, useState } from "react";
import { forgotPasswordUserSchema } from "../../../Schema/Error/AuthSchema.js";
import { Link } from "react-router-dom";
import "./ForgotPasswordForm.css";

export const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = { email };

    // Validar los datos con Joi
    const { error } = forgotPasswordUserSchema.validate(data);

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
    <section className="forgotPassword-container">
      <div className="form-container">
        <div className="forgotPassword-heading">Cambiar contraseña</div>
        <form className="forgotPassword-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="forgotPassword-input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>
          {errorMessages && (
            <p className="forgotPassword-error">{errorMessages}</p>
          )}
          <input
            value="Enviar"
            type="submit"
            className="forgotPassword-button"
          />
        </form>
        <span className="forgotPassword-link">
          <Link to="/login">Volver</Link>
        </span>
      </div>
    </section>
  );
};
