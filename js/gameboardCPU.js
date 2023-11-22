//var audio = document.getElementById("backsound");
//audio.volume = 0.02;

let playerChoice = "";
// OM vi lägger till namn så man kan joina då kan man lägga till || rpsApi.getName() och lägga till det istället
if (rpsApi.getUsername()) {
  let player = document.querySelector("#player");
  player.innerText = rpsApi.getUsername();
}

window.onload = function timer() {
  let sec = 30;
  let time = document.getElementById("time");

  let interval = setInterval(function () {
    if (sec < 10) {
      time.innerHTML = "00:0" + sec;
    } else {
      time.innerHTML = "00" + ":" + sec;
    }

    sec--;

    if (sec == -1 || playerChoice !== "") {
      let reload = document.querySelector("#reloadButton");
      let result = document.querySelector("#result");

      reload.classList.remove("none");


      if (playerChoice === "") {
        result.innerHTML = "TIMES UP";
        paper.classList.add("treD");
        paper.removeAttribute("onclick");

        scissor.classList.add("treD");
        scissor.removeAttribute("onclick");

        rock.classList.add("treD");
        rock.removeAttribute("onclick");

        setTimeout(function () {
          paper.setAttribute("src", "img/card_back.png");
          scissor.setAttribute("src", "img/card_back.png");
          rock.setAttribute("src", "img/card_back.png");
        }, 600);
      }

      clearInterval(interval);
      let timeSection = document.querySelector(".timebox");
      let resultCard = document.querySelector("#resultCard");
      reload.classList.add("reloadButton");

      /* result.classList.remove("none"); */
      result.classList.add("resultBanner");

      timeSection.classList.add("none");

      botChoice(playerChoice);
    }
  }, 1000);
};

function flip(card) {
  let rock = document.querySelector("#rock");
  let paper = document.querySelector("#paper");
  let scissor = document.querySelector("#scissor");

  switch (card) {
    case "rock":
      playerChoice = "rock";

      paper.classList.add("treD");
      paper.removeAttribute("onclick");

      scissor.classList.add("treD");
      scissor.removeAttribute("onclick");

      setTimeout(function () {
        paper.setAttribute("src", "img/card_back.png");
        scissor.setAttribute("src", "img/card_back.png");
      }, 600);
      break;

    case "scissor":
      playerChoice = "scissor";

      rock.classList.add("treD");
      rock.removeAttribute("onclick");

      paper.classList.add("treD");
      paper.removeAttribute("onclick");

      setTimeout(function () {
        paper.setAttribute("src", "img/card_back.png");
        rock.setAttribute("src", "img/card_back.png");
      }, 600);
      break;

    case "paper":
      playerChoice = "paper";

      rock.classList.add("treD");
      rock.classList.add("oppCard");
      rock.removeAttribute("onclick");

      scissor.classList.add("oppCard");
      scissor.classList.add("treD");
      scissor.classList.remove('scissors');
      scissor.removeAttribute("onclick");

      setTimeout(function () {
        rock.setAttribute("src", "img/card_back.png");
        scissor.setAttribute("src", "img/card_back.png");
      }, 600);
      break;
  }
}

function botChoice(playerChoice) {
  let oppCard = document.querySelector("#oppCard");
  let result = document.querySelector("#result");

  switch (Math.floor(Math.random() * 3)) {
    case 0:
      oppCard.classList.add("treDC");
      setTimeout(function () {
        oppCard.setAttribute("src", "../img/Rock_pic.png");
        oppCard.classList.add('rock');
        oppCard.classList.remove('oppCard');
      }, 600);

      switch (playerChoice) {
        case "rock":
          result.append("DRAW");
          break;
        case "paper":
          result.append("PLAYER WIN");
          break;
        case "scissor":
          result.append("PLAYER LOSE");
          break;
      }

      break;

    case 1:
      oppCard.classList.add("treDC");
      setTimeout(function () {
        oppCard.classList.add('paper')
        oppCard.setAttribute("src", "../img/paper_pic.png");
        oppCard.classList.remove('oppCard');
      }, 600);

      switch (playerChoice) {
        case "rock":
          result.append("PLAYER LOSE");
          break;
        case "paper":
          result.append("DRAW");
          break;
        case "scissor":
          result.append("PLAYER WIN");
          break;
      }
      break;

    case 2:
      oppCard.classList.add("treDC");
      setTimeout(function () {
        oppCard.classList.add('scissor')
        oppCard.setAttribute("src", "../img/scissors_pic.png");
        oppCard.classList.remove('oppCard');
      }, 600);

      switch (playerChoice) {
        case "rock":
          result.append("PLAYER WIN");
          break;
        case "paper":
          result.append("PLAYER LOSE");
          break;
        case "scissor":
          result.append("DRAW");
          break;
      }
      break;
  }
}
