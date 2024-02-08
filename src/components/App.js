import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { api, apiRegister } from "../utils/api";
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

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // estado de la sesión del usuario

  const [email, setEmail] = useState(null); // email del usuario

  const [token, setToken] = useState(""); // token del usuario  para la autenticación

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
          // console.log(response);
        } else {
          setIsInfoTooltipFailOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  // obtencion  del token de usuario

  const handleSigninSubmit = (user) => {
    apiRegister
      .authUser(user)
      .then((data) => {
        if (data) {
          // maneja la respuesta del servidor aquí
          // redirigir al usuario a la pgina principal de la app
          localStorage.clear();
          //console.log(data.token);
          localStorage.setItem("token", data.token);
          //console.log(localStorage.getItem("token"));
          // console.log(token);
          handleUser();
          setIsLoggedIn(true);
          navigate("/");
        } else {
          // maneja errores de carga de datos
          setIsInfoTooltipFailOpen(true);
          throw new Error("Token not returned");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
    // dirigir a para  configurar el mail a mostar
  };

  // manejador del token para obtener  usuario

  const handleUser = () => {
    //console.log(localStorage.getItem("token"));
    api
      .getUser()
      .then((response) => {
        if (response) {
          // maneja la respuesta del servidor aquí
          // agregar el email al encabezado
          // console.log(response);
          setEmail(response.data.email);
          setCurrentUser(response.data);
        } else {
          // maneja errores de carga de datos
          console.log(response);
        }
      })
      .catch((error) => {
        alert("Error during registration:", error);
      });
  };

  const handleCards = () => {
    api
      .getCardList()
      .then((cardsList) => {
        setCards(cardsList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const checkToken = async () => {
      setToken(localStorage.getItem("token"));
      // console.log(token);
      if (token) {
        handleUser();
        handleCards();
        setIsLoggedIn(true);
        navigate("/");
      }
    };
    checkToken();
  }, [navigate, token]);

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addNewCard(cardData)
      .then((newCard) => {
        // console.log(newCard);
        setCards([newCard, ...(Array.isArray(cards) ? cards : [])]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  const handleUpdateAvatar = (userData) => {
    if (!userData || !userData.avatar) {
      console.error("userData is undefined or does not have a name property");
      return;
    }
    api
      .setUserAvatar(userData)
      .then((updateAvatarData) => {
        // console.log(updateAvatarData);
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
      .then((response) => {
        setCurrentUser(response.data);
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

  function handleCardLike(card) {
    if (!card || !card._id) {
      console.error("Invalid card object");
      return;
    }
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    if (!card || !card._id) {
      console.error("Invalid card object");
      return;
    }

    // Envía una petición a la API y excluye la tarjeta seleccionada
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  const handleLogout = () => {
    setEmail(null);
    setIsLoggedIn(false);
    localStorage.clear();
    setToken("");
    window.location.reload();
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
