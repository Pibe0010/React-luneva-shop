import { useEffect, useState } from "react";
import { newUserSchema } from "../../../Schema/Error/CreateSchema.js";
import { Link } from "react-router-dom";
import { EyePassword } from "../../EyePassword/EyePassword.jsx";
import "./Register.css";

export const Register = ({ onSubmit }) => {
  const [user_name, setUser_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpio los errores
    setErrorMessages("");

    // Datos a validar
    const data = { user_name, last_name, email, password };

    // Validar los datos con Joi
    const { error } = newUserSchema.validate(data);

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
    <section className="register-container">
      <div className="regi-container">
        <div className="register-heading">Registro</div>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="user_name">
            <input
              placeholder="Nombre"
              id="user_name"
              name="user_name"
              type="text"
              className="register-input"
              onChange={(e) => setUser_name(e.target.value)}
              value={user_name}
              required
            />
          </label>
          <label htmlFor="last_name">
            <input
              placeholder="Apellido"
              id="last_name"
              name="last_name"
              type="text"
              className="register-input"
              onChange={(e) => setLast_name(e.target.value)}
              value={last_name}
              required
            />
          </label>
          <label htmlFor="email">
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="register-input"
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
                className="register-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <EyePassword idInput="password" />
            </label>
          </div>
          {errorMessages && <p className="register-error">{errorMessages}</p>}
          <input
            value="Registrarse"
            type="submit"
            className="register-button"
          />
        </form>
        <span className="register-agreement">
          <Link to="/license-agreement">
            Conozca el acuerdo de licencia de usuario
          </Link>
        </span>
      </div>
    </section>
  );
};
