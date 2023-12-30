import "../index.css";

function ImagePopup({ selectedCard, onClose }) {
  return (
    <section
      className={`image-popup ${selectedCard ? "image-popup_visible" : ""}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="image-popup__close"
        onClick={onClose}
      ></button>
      <img
        alt={`imagen de ${selectedCard.name}`}
        src={selectedCard.link}
        className="image-popup__photo"
      />
      <p className="image-popup__name">{selectedCard.name}</p>
    </section>
  );
}

export default ImagePopup;
