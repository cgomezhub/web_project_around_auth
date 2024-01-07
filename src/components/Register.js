import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de autenticación
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Registrate</h2>
        <input
          className="auth-form__input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          className="auth-form__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
