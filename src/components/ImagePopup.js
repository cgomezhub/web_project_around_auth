import "../index.css";
import React, { useEffect } from "react";

function ImagePopup({ selectedCard, onClose }) {
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape" && selectedCard) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscClose);

    // Limpiar event listener al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [selectedCard, onClose]);

  return (
    <section
      className={`image-popup ${selectedCard ? "image-popup_visible" : ""}`}
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
