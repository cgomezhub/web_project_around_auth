import logo from "../images/logo-around-theUS.svg";


import '../index.css';
 
function Header() {
  
  return (
    
      <div className="page">
        <header className="header">
          <img
            src={logo}
            alt="logo around the US"
            className="logo"
          />
          <div className="line"></div>
          
        </header>        
      </div>
    
  );
}

export default Header;

