import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onSigninSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const user = { email, password };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSigninSubmit(user);
  };

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Inicia Sesión</h2>
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
          minLength="8"
          maxLength="20"
          required
        />
        <button type="submit" className="auth-form__button">
          Inicia Sesion
        </button>
        <p className="auth-form__register">
          ¿Aún no eres miembro? &nbsp;
          <Link to="/signup" className="auth-form__register">
            Registrate aqui
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
