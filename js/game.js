let audio = document.getElementById("backsound");
audio.volume = 0.02;

/* Hamburgarmenyn */

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".primary-navigation");
const webSiteNavigation = document.querySelector("#webMenu");

if (!sessionStorage.getItem("username")) {
    let li = document.createElement("li");
    let liWeb = document.createElement("li");
    let a = document.createElement("a");
    let aWeb = document.createElement("a");
    let join = document.querySelector("#Multiplayer");
    let spanMulti = document.querySelector("#spanMulti");

    spanMulti.classList.remove("none");
    join.removeAttribute("onclick");

    a.append("login");
    aWeb.append("login");
    a.href = "login.html";
    aWeb.href = "login.html";

    li.appendChild(a);
    liWeb.appendChild(aWeb);
    siteNavigation.appendChild(li);
    webSiteNavigation.appendChild(liWeb);
}
if (sessionStorage.getItem("username")) {
    let li = document.createElement("li");
    let a = document.createElement("a");

    a.append("logout");
    a.href = "#";
    a.onclick = function () {
        rpsApi.removeUsername();
        rpsApi.fetchToken();
        location.assign("index.html");
    };

    let liWeb = document.createElement("li");
    let aWeb = document.createElement("a");
    aWeb.append("logout");
    aWeb.href = "#";
    aWeb.onclick = function () {
        rpsApi.removeUsername();
        rpsApi.fetchToken();
        location.assign("index.html");
    };

    li.appendChild(a);
    liWeb.appendChild(aWeb);
    webSiteNavigation.appendChild(li);
    siteNavigation.appendChild(liWeb);
}

menuToggle.addEventListener("click", () => {
    const isOpened = menuToggle.getAttribute("aria-expanded") === "true";
    isOpened ? closeMenu() : openMenu();
});

function openMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    siteNavigation.setAttribute("data-state", "opened");
}

function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNavigation.setAttribute("data-state", "closing");

    siteNavigation.addEventListener(
        "animationed",
        () => {
            siteNavigation.setAttribute("data-state", "closed");
        },
        { once: true }
    );
}

/* ############################################################# */

let listedGames = [];
let isGames = true;

setInterval(() => {
    rpsApi.openGames()
        .then((games) => {
        let resList = document.querySelector("#gameCards");
        if (games.length !== 0) {
            for (let key in games) {
                if (!listedGames.includes(games[key].gameStatusId)) {
                    listedGames.push(games[key].gameStatusId);

                    const ul = document.createElement("ul");
                    ul.classList.add("card");

                    const li = document.createElement("li");
                    li.append(`Player: ${games[key].playerOne.username}`);

                    ul.appendChild(li);
                    if (rpsApi.getUsername()) {
                        const button = document.createElement("button");
                        button.classList.add("btn");
                        button.classList.add("btnPink");
                        button.append("JOIN GAME");

                        button.addEventListener("click", function () {
                            joinGame(games[key].gameStatusId);
                        });
                        ul.appendChild(button);
                    } else {
                        const li = document.createElement("li");
                        li.innerText = "You need to login to join";
                        ul.append(li);
                    }

                    resList.append(ul);
                }
            }
            isGames = false;
        }
        if (isGames) {
            const h2 = document.createElement("h2");
            h2.append("NO OPEN GAMES");
            resList.appendChild(h2);
            isGames = false;
        }
    });
}, 500);

/* create game */

function createGame() {
    rpsApi.createGame().then(() => window.location.assign("gameBoard2P.html"));
}

function joinGame(gameID) {
    if (sessionStorage.getItem("username")) {
        rpsApi.joinGame(gameID).then(() => location.assign("gameBoard2P.html"));
    } else {
    }
}

/* Hamburgarmenyn */
