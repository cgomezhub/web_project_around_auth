import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar:
        inputRef.current
          .value /* El valor de la entrada que obtuvimos utilizando la ref */,
    });
  }

  return (
    <PopupWithForm
      title="Cambiar Foto de Perfil"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      className={isOpen ? "active" : "popup_is-opened"}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="url-input-avatar"
        ref={inputRef}
        className="form__input"
        placeholder="Introduce URL (https://... o http://...)"
        required
      />
      <span className="url-input-avatar-error form__error"></span>
      <div className="form__button-container">
        <button id="button-avatar-save" type="submit" className="form__button">
          Guardar
        </button>
        <button id="button-avatar-saving" className="form__button-saving">
          Guardando...
        </button>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
