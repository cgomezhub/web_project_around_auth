import "../index.css";
import check from "../images/Unioncheck.png";

function InfoTooltip({ isOpen, onClose }) {
  return (
    <section className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="container-info-tool">
        <button
          type="button"
          className="container-info-tool__close"
          onClick={onClose}
        ></button>
        <img
          src={check}
          alt="imagen unioncheck"
          className="container-info-tool__image"
        />
        <h2 className="container-info-tool__text">
          ¡Correcto! Ya estás registrado.
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
