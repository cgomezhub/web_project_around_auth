import logo from "../images/logo-around-theUS.svg";
import "../index.css";

function Header({ children }) {
  return (
    <div className="page">
      <header className="header">
        <img src={logo} alt="logo around the US" className="logo" />
        {children}
      </header>
      <div className="line"></div>
    </div>
  );
}

export default Header;
