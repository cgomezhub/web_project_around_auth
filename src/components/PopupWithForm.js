import "../index.css";
import React, { useEffect } from "react";

function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscClose);

    // Limpiar event listener al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <section className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <form id={name} className="form" onSubmit={onSubmit}>
        <button
          type="button"
          className="form__close"
          onClick={onClose}
        ></button>
        <h2 className="form__title">{title}</h2>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
