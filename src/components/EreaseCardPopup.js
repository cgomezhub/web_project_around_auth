import PopupWithForm from "./PopupWithForm";

function EreaseCardPopup({ isOpen, onClose, onCardDelete, selectedCard }) {
  return (
    <PopupWithForm
      title="¿Estás seguro/a?"
      name="eraese-form"
      isOpen={isOpen}
      onClose={onClose}
      className={isOpen ? "active" : "popup_is-opened"}
    >
      <button
        type="button"
        className="form__button"
        onClick={() => onCardDelete(selectedCard)}
      >
        Sí
      </button>
    </PopupWithForm>
  );
}

export default EreaseCardPopup;
