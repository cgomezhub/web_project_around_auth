import "../index.css";
import check from "../images/Unionfail.png";

function InfoTooltipFail({ isOpen, onClose }) {
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
          alt="imagen unioncheckfail"
          className="container-info-tool__image"
        />
        <h2 className="container-info-tool__text">
          Uy, algo salió mal. Por favor, inténtalo de nuevo.
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltipFail;
