import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import InfoTooltipFail from "./InfoTooltipFail";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEraseCardPopupOpen, setIsEraseCardPopupOpen] = useState(false);
  const [selectedCard, setSeletedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function RedirectToHome() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate("/");
    }, [navigate]);

    return null;
  }

  // Esta función se puede llamar para cambiar el estado de isLoggedIn
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Esta función se puede llamar para cerrar la sesión del usuario
  // probablemente implicará eliminar el token de autenticación del usuario
  // y redirigir al usuario a la página de inicio de sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .getCardList()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = (userData) => {
    api
      .setUserAvatar(userData)
      .then((updateAvatarData) => {
        setCurrentUser(updateAvatarData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData)
      .then((updateUserData) => {
        setCurrentUser(updateUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardClick = (card) => {
    setSeletedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEraseCardClick = () => {
    setIsEraseCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEraseCardPopupOpen(false);
    setSeletedCard(null);
  };

  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    // Envía una petición a la API y excluye la tarjeta seleccionada
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route
            path="/signin"
            element={isLoggedIn ? <RedirectToHome /> : <Auth />}
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onEraseCardClick={handleEraseCardClick}
                  onClose={closeAllPopups}
                  isEraseCardPopupOpen={isEraseCardPopupOpen}
                  selectedCard={selectedCard}
                  onSelectedCard={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onLogout={handleLogout}
                  onLogin={handleLogin}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={<RedirectToHome />} />
        </Routes>
        {/*<InfoTooltip />*/}
        {/*<InfoTooltipFail />*/}
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
