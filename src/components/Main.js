import "../index.css";
import PopupWithForm from "./PopupWithForm";
import pencil from "../images/Vectoredit-pencil2.svg";
import React, { useContext } from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onEraseCardClick,
  onClose,
  isEraseCardPopupOpen,
  selectedCard,
  onSelectedCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) {
    return <div>Loading...</div>; //
  }

  return (
    <div>
      <div className="page">
        <main className="container">
          <div className="profile">
            <div className="profile__avatar-container">
              <img
                src={currentUser.avatar}
                alt="Avatar del usuario"
                className="profile__avatar"
              />
              <img
                src={pencil}
                alt="Pencil de editar"
                className="profile__avatar-edit"
                onClick={onEditAvatarClick}
              />
            </div>
            <ul className="profile__place">
              <li className="profile__name">{currentUser.name}</li>
              <li className="profile__about">{currentUser.about}</li>
            </ul>
            <button
              type="button"
              className="button-edit"
              onClick={onEditProfileClick}
            ></button>
            <button
              type="button"
              className="button-place"
              onClick={onAddPlaceClick}
            ></button>
          </div>
          <Card
            cards={cards}
            selectedCard={selectedCard}
            onSelectedCard={onSelectedCard}
            onEraseCardClick={onEraseCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
          {selectedCard && (
            <ImagePopup selectedCard={selectedCard} onClose={onClose} />
          )}
          <PopupWithForm
            title="¿Estás seguro/a?"
            name="sure-form"
            isOpen={isEraseCardPopupOpen}
            onClose={onClose}
            className={isEraseCardPopupOpen ? "active" : "popup_is-opened"}
          >
            <button
              type="button"
              className="form__button"
              onClick={onCardDelete}
            >
              Sí
            </button>
          </PopupWithForm>
        </main>
      </div>
    </div>
  );
}
export default Main;
