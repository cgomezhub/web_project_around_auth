import "../index.css";
import React, { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  cards,
  onSelectedCard,
  onEraseCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="cards">
      {Array.isArray(cards) &&
        cards.map((card, index) => {
          const key = card._id || index; // Si la tarjeta no tiene _id, usa el índice del array
          // Verificando si el usuario actual es el propietario de la tarjeta actual
          const isOwn = card.owner === currentUser._id;
          // Creando una variable que después establecerás en `className` para el botón eliminar
          const cardDeleteButtonClassName = `card__trash ${
            isOwn ? "card__trash_active" : "card__trash"
          }`;

          // Verifica si el usuario actual le dio "like" a la tarjeta
          const isLiked = card.likes.some((i) => i === currentUser._id);

          // Crea una variable que después establecerás en `className` para el botón like
          const cardLikeButtonClassName = `card__heart ${
            isLiked ? "card__heart_active" : "card__heart"
          }`;

          return (
            <div className="card" key={key}>
              <img
                className="card__link"
                src={card.link}
                alt={`imagen de ${card.name}`}
                onClick={() => onSelectedCard(card)}
              />
              <button
                className={cardDeleteButtonClassName}
                onClick={() => onCardDelete(card)}
              ></button>
              <p className="card__name">{card.name}</p>
              <button
                className={cardLikeButtonClassName}
                onClick={() => onCardLike(card)}
              ></button>
              <p className="card__like-count">
                {card.likes && card.likes.length}
              </p>
            </div>
          );
        })}
    </section>
  );
}

export default Card;
