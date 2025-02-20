import { useEffect, useState } from "react";
import "./Login.css";
import { loginSchema } from "../../../Schema/Error/AuthSchema.js";
import { Link } from "react-router-dom";
import { EyePassword } from "../../EyePassword/EyePassword.jsx";

export const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = { email, password };

    // Validar los datos con Joi
    const { error } = loginSchema.validate(data);

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
    <section className="login-container">
      <div className="container">
        <div className="heading">Login</div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>
          <div className="input-container">
            <label htmlFor="password">
              <input
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <EyePassword className="container-eye" idInput="password" />
            </label>
          </div>
          <span className="forgot-password">
            <Link to="/forgot-password">Has olvidado tu contraseña ?</Link>
          </span>
          {errorMessages && (
            <p className="error" style={{ color: "red" }}>
              {errorMessages}
            </p>
          )}
          <input
            value="Iniciar Sesión"
            type="submit"
            className="login-button"
          />
        </form>
        <span className="agreement">
          <Link to="/license-agreement">
            Conozca el acuerdo de licencia de usuario
          </Link>
          <Link to="/register">Registrarse</Link>
        </span>
      </div>
    </section>
  );
};
