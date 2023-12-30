import React, { useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    
    // La URL es válida, enviar los datos al controlador externo
    onAddPlaceSubmit({
      name,
      link: image,
    });
  }

  return (
    <PopupWithForm
      title="Nuevo Lugar"
      name="add-image"
      isOpen={isOpen}
      onClose={onClose}
      className={isOpen ? "active" : "popup_is-opened"}
      onSubmit={handleSubmit}
    >
      <input
        id="text-input-place"
        type="text"
        className="form__input"
        placeholder="Nombre del lugar"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="text-input-place-error form__error"></span>
      <input
        type="url"
        id="url-input-image"
        className="form__input"
        placeholder="Introduce URL (https://... o http://...)"
        required
        value={image}
        onChange={handleImageChange}
      />
      <span className="url-input-image-error form__error"></span>
      <div className="form__button-container">
        <button id="button-add-save" type="submit" className="form__button">
          Crear
        </button>
        <button id="button-add-saving" className="form__button-saving">
          Guardando...
        </button>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
