let audio = document.getElementById("backsound");
audio.volume = 0.02;

const playerName = document.querySelector('#playerName');
let timeSection = document.querySelector(".timer");
let resultCard = document.querySelector("#resultCard");
let result = document.querySelector('#result');

result.classList.remove("none");
result.classList.add('resultBanner');
result.classList.add('top-margin');

result.innerText = 'WAITING FOR OPPONENT';
timeSection.classList.add("none");

playerName.innerText = rpsApi.getUsername();


let startInterval = setInterval( function() {
    rpsApi.gameInfo()
    .then(response => {
        const oppName = document.querySelector('#oppName');
        /* let rpsCards = document.querySelector("#rpsCards"); */
        if (response.playerTwo !== null) {
            /* rpsCards.classList.remove('visually-hidden');
            rpsCards.classList.add('rpscards'); */
            
            if (rpsApi.getToken() == response.playerOne.userId) {
                oppName.innerText = `Opponent: ${response.playerTwo.username}`;
            } else {
                oppName.innerText = `Opponent: ${response.playerOne.username}`;
            }
            timer();
        } 
        
    });
}, 1000);


function timer() {
    
    clearInterval(startInterval);
    
    let timeSection = document.querySelector("#time-section");
    let time = document.querySelector("#time");
    let sec = 30;
    result.classList.add('none');
    timeSection.classList.remove('none');
    let interval = setInterval(function () {
        rpsApi.gameInfo()
        .then(games => {
            if (sec < 10) {
            time.innerHTML = "00:0" + sec;
            } else {
            time.innerHTML = "00" + ":" + sec;
            }
        
            sec--;
            
            if (sec == -1 || games.playerMove !== null && games.opponentMove !== null) {

            
            
                clearInterval(interval);
                let timeSection = document.querySelector(".timer");
                let resultCard = document.querySelector("#resultCard");
                
                result.classList.remove("none");
                result.classList.add('resultBanner');
            
                timeSection.classList.add("none");
            
                resultCard.classList.remove("none");
                resultCard.classList.add("rpscards");
                resultCard.classList.add("resultCard");
            
                if(games.opponentMove === null && games.playerMove === null) {
                    rpsApi.autoLoseMove('rock', games.playerTwo.userId);
                    setTimeout(function() {
                        rpsApi.autoLoseMove('rock', games.playerOne.userId)
                    }, 1000);

                    result.innerText = 'DRAW';
                    paper.classList.add("treD");
                    paper.removeAttribute('onclick');

                    scissor.classList.add("treD");
                    scissor.removeAttribute('onclick');

                    rock.classList.add("treD");
                    rock.removeAttribute('onclick')

                    setTimeout(function () {
                        paper.setAttribute("src", "img/card_back.png");
                        scissor.setAttribute("src", "img/card_back.png");
                        rock.setAttribute("src", "img/card_back.png");
                    }, 600);
                }

                if (games.playerMove === null && games.opponentMove !== null) {
                    
                    defWin(games.opponentMove.toLowerCase(), games.playerOne.userId);

                }

                if (games.opponentMove === null && games.playerMove !== null) {
                    
                    defWin(games.playerMove.toLowerCase(), games.playerTwo.userId);

                }


                if (games.playerMove !== null && games.opponentMove !== null) {
                    result.innerText = 'DRAW';
                    paper.classList.add("treD");
                    paper.removeAttribute('onclick');

                    scissor.classList.add("treD");
                    scissor.removeAttribute('onclick');

                    rock.classList.add("treD");
                    rock.removeAttribute('onclick')

                    setTimeout(function () {
                        paper.setAttribute("src", "img/card_back.png");
                        scissor.setAttribute("src", "img/card_back.png");
                        rock.setAttribute("src", "img/card_back.png");
                    }, 600);
                    clearInterval(interval);
                    result.innerText = games.gameStatus;
                }
            }

        })
    }, 1000);
  };


function flip(card) {
  let rock = document.querySelector("#rock");
  let paper = document.querySelector("#paper");
  let scissor = document.querySelector("#scissor");

  switch (card) {

    case "rock":
      rpsApi.makeMove('rock');

      paper.classList.add("treD");
      paper.removeAttribute('onclick');

      scissor.classList.add("treD");
      scissor.removeAttribute('onclick');

      setTimeout(function () {
        paper.setAttribute("src", "img/card_back.png");
        scissor.setAttribute("src", "img/card_back.png");
      }, 600);
      break;

    case "scissor":
      rpsApi.makeMove('scissors')

      rock.classList.add("treD");
      rock.removeAttribute('onclick');

      paper.classList.add("treD");
      paper.removeAttribute('onclick');

      setTimeout(function () {
        paper.setAttribute("src", "img/card_back.png");
        rock.setAttribute("src", "img/card_back.png");
      }, 600);
      break;

    case "paper":
      rpsApi.makeMove('paper');

      rock.classList.add("treD");
      rock.removeAttribute('onclick');

      scissor.classList.add("treD");
      scissor.removeAttribute('onclick');
      
      setTimeout(function () {
        rock.setAttribute("src", "img/card_back.png");
        scissor.setAttribute("src", "img/card_back.png");
      }, 600);
      break;
  }
}

function defWin(move, playerID) {
    switch (move) {
        case 'rock':
            rpsApi.autoLoseMove('scissors', playerID);
            break;
        case 'paper':
            rpsApi.autoLoseMove('rock', playerID);
            break;
        case 'scissor':
            rpsApi.autoLoseMove('paper', playerID);
            break;
    }


    result.innerText = 'WIN';
    paper.classList.add("treD");
    paper.removeAttribute('onclick');

    scissor.classList.add("treD");
    scissor.removeAttribute('onclick');

    rock.classList.add("treD");
    rock.removeAttribute('onclick')

    setTimeout(function () {
        paper.setAttribute("src", "img/card_back.png");
        scissor.setAttribute("src", "img/card_back.png");
        rock.setAttribute("src", "img/card_back.png");
    }, 600);
}

function exit() {
    rpsApi.removeGameId();
}

