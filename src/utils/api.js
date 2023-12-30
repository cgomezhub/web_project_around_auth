class Api {
  constructor(options) {
    this.address = options.address;
    this.headers = options.headers;
  }
  getUserInfo() {
    return fetch(`${this.address}/users/me`, {
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
  setUserInfo(updatedData) {
    return fetch(`${this.address}/users/me`, {
      method: "PATCH",
      headers: this.headers,
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
  // Actualizar la foto de perfil

  setUserAvatar(updatedAvatar) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(updatedAvatar),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Error: ' + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // agregar mueva card

  addNewCard(newImage) {
    return fetch(`${this.address}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(newImage),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Error: ' + res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new Api({
  address: "https://around.nomoreparties.co/v1/web_es_09",
  headers: {
    authorization: "24db7356-9f7a-470a-979e-9ec3f25f6f02",
    "Content-Type": "application/json",
  },
});

export default api;
