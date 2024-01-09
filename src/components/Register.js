import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { apiRegister } from "../utils/api";

function Register({ onRegisterSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };

    onRegisterSubmit(user);
  };

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Registrate</h2>
        <input
          className="auth-form__input"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          className="auth-form__input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Contraseña"
          minLength="4"
          maxLength="20"
          required
        />
        <button type="submit" className="auth-form__button">
          Registrate
        </button>
        <p className="auth-form__register">
          ¿Ya eres miembro? &nbsp;
          <Link to="/signin" className="auth-form__register">
            Inicia sesión aqui
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
