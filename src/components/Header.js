import logo from "../images/logo-around-theUS.svg";
import "../index.css";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onLogout }) {
  const location = useLocation();

  if (isLoggedIn) {
    return (
      <div className="page">
        <header className="header">
          <img src={logo} alt="logo around the US" className="logo" />
          <div>
            {userEmail}
            <Link to="/signin">
              <button onClick={onLogout} className="header__close">
                Cerrar sesión
              </button>
            </Link>
          </div>
        </header>
        <div className="line"></div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <img src={logo} alt="logo around the US" className="logo" />
        <div>
          {location.pathname === "/signin" ? (
            <Link to="/signup">
              <button className="header__close">Regístrate</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className="header__close">Iniciar sesión</button>
            </Link>
          )}
        </div>
      </header>
      <div className="line"></div>
    </div>
  );
}

export default Header;
