class Api {
  constructor(options) {
    this.address = options.address;
    this.headers = options.headers;
  }

  // actualizar token en localstorage

  getHeaders() {
    return {
      ...this.headers,
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  getCardList() {
    return fetch(`${this.address}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeLikeCardStatus(cardId, like) {
    const method = like ? "PUT" : "DELETE";
    return fetch(`${this.address}/cards/likes/${cardId}`, {
      method: method,
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.address}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // actualizar info de users

  setUserInfo(updatedData) {
    return fetch(`${this.address}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // registrar usuario

  register(user) {
    return fetch(`${this.address}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Autorizar usuario

  authUser(user) {
    return fetch(`${this.address}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //obtener EL usuario y fijar su email en el header

  getUser() {
    return fetch(`${this.address}/users/me`, {
      headers: this.getHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Actualizar la foto de perfil

  setUserAvatar(updatedAvatar) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(updatedAvatar),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // agregar mueva card

  addNewCard(newImage) {
    return fetch(`${this.address}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(newImage),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error: " + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api({
  address: "https://api.around.myremotetest.eu",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

const apiRegister = new Api({
  address: "https://api.around.myremotetest.eu",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, apiRegister };
