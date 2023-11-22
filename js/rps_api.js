/*
 *
 * Starta nytt / joina
 *
 *
 */

const rpsApi = {
  setToken: (token) => sessionStorage.setItem("token", token),
  getToken: () => sessionStorage.getItem("token"),
  fetchToken: () => {
    fetch("http://localhost:8080/auth/token")
        .then((response) => response.json())
        .then((text) => rpsApi.setToken(text))
        .catch((e) => console.log(`Det blev något fel ${e}`));
  },

  setUsername: (username) => sessionStorage.setItem("username", username),
  getUsername: () => sessionStorage.getItem("username"),
  removeUsername: () => sessionStorage.removeItem("username"),

  setGameId: (gameID) => sessionStorage.setItem("gameID", gameID),
  getGameId: () => sessionStorage.getItem("gameID"),
  removeGameId: () => sessionStorage.removeItem("gameID"),

  /*   setName: (name) => {
    fetch("setnameURL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: rpsApi.getToken(),
      },
      body: JSON.stringify({ name: name }),
    });
  }, 
  
  känns överflödeig med setName med vår loginfunction*/

  /* Fetch openGame */

  openGames: () => {
    return fetch("http://localhost:8080/games")
        .then((response) => response.json())
        .catch((e) => console.log(`Något blev fel ${e}`));
  },

  /* Fetch login */

  /* Login function. Tar in username och password som parametrar. hämtar även ett token vid login. */
  login: (username, password) => {
    return fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
        .then((response) => response.json())
        .catch((e) => console.log(`Något blev fel ${e}`));
  },

  /* Fetch register */

  register: (usern, passw) => {
    return (
        fetch("http://localhost:8080/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: rpsApi.getToken(),
          },
          body: JSON.stringify({ username: usern, password: passw }),
        })
            .then((response) => response.json())
            /*     .then(response => console.log(response)) */
            .catch((e) => console.log(`Något blev fel ${e}`))
    );
  },

  /* Fetch createGame */

  createGame: () => {
    return fetch("http://localhost:8080/games/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: rpsApi.getToken(),
      },
    })
        .then((response) => response.json())
        .then((gameID) => {
          console.log(gameID);
          rpsApi.setGameId(gameID.gameStatusId);
        })
        .catch((e) => console.log(`Något blev fel ${e}`));
  },

  /* Fetch Join Game */

  joinGame: (gameID) => {
    return fetch(`http://localhost:8080/games/join/${gameID}`, {
      headers: {
        "Content-Type": "application/json",
        token: rpsApi.getToken(),
      },
    })
        .then((response) => response.json())
        .then((gameID) => rpsApi.setGameId(gameID.gameStatusId))
        .catch((e) => console.log(`Något blev fel ${e}`));
  },

  /* Fetch getGameStatus */

  gameInfo: () => {
    return fetch("http://localhost:8080/games/gameID", {
      headers: {
        "Content-Type": "application/json",
        gameID: rpsApi.getGameId(),
        token: rpsApi.getToken(),
      },
    })
        .then((response) => response.json())
        .catch((e) => console.log(`Något blev fel ${e}`));
  },

  /* Fetch makemove */
  makeMove: (move) => {
    return fetch("http://localhost:8080/games/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sign: `${move}`,
        token: rpsApi.getToken(),
        gameID: rpsApi.getGameId(),
      },
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(`Något blev fel ${e}`));
  },

  autoLoseMove: (move, token) => {
    return fetch("http://localhost:8080/games/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sign: `${move}`,
        token: token,
        gameID: rpsApi.getGameId(),
      },
    })
        .then((response) => response.json())
        .catch((e) => console.log(`Något blev fel ${e}`));
  },
};

if (sessionStorage.getItem("token") === null) {
  rpsApi.fetchToken();
}
