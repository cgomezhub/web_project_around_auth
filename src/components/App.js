import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { api, apiRegister, apiToken } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import InfoTooltipFail from "./InfoTooltipFail";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEraseCardPopupOpen, setIsEraseCardPopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipFailOpen, setIsInfoTooltipFailOpen] = useState(false);

  const [selectedCard, setSeletedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // agregar el email al encabezado

  const [email, setEmail] = useState(null);

  // Esta función se puede llamar para cerrar la sesión del usuario
  // implicará eliminar el token de autenticación del usuario
  // y redirigir al usuario a la página de inicio de sesión

  const handleLogout = () => {
    setEmail(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  /*
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
*/
  const navigate = useNavigate();

  const handleRegisterSubmit = (user) => {
    apiRegister
      .register(user)
      .then((response) => {
        if (response) {
          // maneja la respuesta del servidor aquí
          // para abrir los popups de registro positivo o fallido
          setIsInfoTooltipOpen(true);
          navigate("/signin");
        } else {
          setIsInfoTooltipFailOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  // manejador del token

  const handleToken = () => {
    apiToken
      .getUser()
      .then((data) => {
        if (data) {
          // maneja la respuesta del servidor aquí
          // agregar el email al encabezado
          setEmail(data.data.email);
        } else {
          // maneja errores de carga de datos
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  const handleSigninSubmit = (user) => {
    setIsLoggedIn(false);
    localStorage.clear();

    apiRegister
      .authUser(user)
      .then((data) => {
        if (data) {
          // maneja la respuesta del servidor aquí
          // redirigir al usuario a la pgina principal de la app
          setIsLoggedIn(true);
          navigate("/");
          localStorage.setItem("token", data.token);
          // dirigir a para  configurar el mail a mostar
          handleToken();
        } else {
          // maneja errores de carga de datos
          setIsInfoTooltipFailOpen(true);
          throw new Error("Token not returned");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        handleToken();
        setIsLoggedIn(true);
        navigate("/");
      }
    };
    checkToken();
  }, [navigate]);

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
    setIsInfoTooltipOpen(false);
    setIsInfoTooltipFailOpen(false);
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
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          userEmail={email}
        />
        {!isLoggedIn && (
          <Auth
            onRegisterSubmit={handleRegisterSubmit}
            onSigninSubmit={handleSigninSubmit}
          />
        )}

        <Routes>
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
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
        <InfoTooltipFail
          isOpen={isInfoTooltipFailOpen}
          onClose={closeAllPopups}
        />
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
