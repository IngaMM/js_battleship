const { positionShips } = require("../src/positionShips");

class Visualization {
  constructor() {}

  showPositioningScreen(player, game, gameboard) {
    let passDeviceScreen = document.getElementById("passDeviceScreen");
    passDeviceScreen.classList.add("invisible");

    this.preparePositioningScreen(player);

    // Grid with randomly distributed ships for drag and drop and turn (written in separate module)
    positionShips();

    let button = document.createElement("button");
    let buttonContainer = document.createElement("div");
    button.id = "btnConfirm";
    buttonContainer.id = "buttonContainer";
    button.innerHTML = "Confirm position";
    if (player === "Player1" && game.player2.isComputer === false) {
      // Allow Player 2 to choose the position of the ships
      button.addEventListener("click", evt => {
        gameboard.placeShips();
        this.showPassDeviceScreen("positioningScreen", () => {
          this.showPositioningScreen("Player2", game, game.player2.gameboard);
        });
      });
    } else if (player === "Player1" && game.player2.isComputer === true) {
      button.addEventListener("click", evt => {
        // Place ships of Player2 (computer) randomly & switch automatically to playScreen
        gameboard.placeShips();
        this.preparePositioningScreen();
        positionShips();
        game.player2.gameboard.placeShips();
        this.switchScreensPosPlay(evt, this, game);
      });
    } else {
      // Switch to playScreen after player2 (not computer) has confirmed the position of the ships
      button.addEventListener("click", evt => {
        gameboard.placeShips();
        this.showPassDeviceScreen("positioningScreen", () => {
          this.switchScreensPosPlay(evt, this, game);
        });
      });
    }

    positioningScreen.appendChild(buttonContainer);
    buttonContainer.appendChild(button);
  }

  preparePositioningScreen(player) {
    let selectComputerScreen = document.getElementById("selectComputerScreen");
    selectComputerScreen.classList.add("invisible");

    let positioningScreen = document.getElementById("positioningScreen");

    positioningScreen.classList.remove("invisible");
    // Delete all children
    while (positioningScreen.firstChild) {
      positioningScreen.removeChild(positioningScreen.firstChild);
    }

    let posInfo = document.createElement("h2");
    posInfo.id = "posInfo";
    posInfo.innerHTML = player + ": Position the ships";
    positioningScreen.appendChild(posInfo);

    let posGridContainer = document.createElement("div");
    posGridContainer.id = "posGridContainer";
    positioningScreen.appendChild(posGridContainer);
  }

  switchScreensPosPlay(evt, vis, game) {
    // Switch from positioningScreen to playScreen
    let passDeviceScreen = document.getElementById("passDeviceScreen");
    passDeviceScreen.classList.add("invisible");
    document.getElementById("playScreen").classList.remove("invisible");
    document.getElementById("positioningScreen").classList.add("invisible");
    vis.drawGameboards(game);
  }

  drawGameboards(game) {
    let passDeviceScreen = document.getElementById("passDeviceScreen");
    passDeviceScreen.classList.add("invisible");

    this.drawAnnouncement(game);

    let container = document.getElementById("gameboardContainer");
    // clear container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let header1 = document.createElement("h1");
    let header2 = document.createElement("h1");
    let header3 = document.createElement("h1");
    let header4 = document.createElement("h1");
    header1.innerHTML = "Player 1 - Enemy Gameboard";
    header2.innerHTML = "Player 1 - Own Gameboard";
    header3.innerHTML = "Player 2 - Enemy Gameboard";
    header4.innerHTML = "Player 2 - Own Gameboard";
    header1.id = "headerPlayer1EnemyGameboard";
    header2.id = "headerPlayer1OwnGameboard";
    header3.id = "headerPlayer2EnemyGameboard";
    header4.id = "headerPlayer2OwnGameboard";

    let table1 = document.createElement("table");
    let table2 = document.createElement("table");
    let table3 = document.createElement("table");
    let table4 = document.createElement("table");
    table1.id = "player1EnemyGameboard";
    table2.id = "player1OwnGameboard";
    table3.id = "player2EnemyGameboard";
    table4.id = "player2OwnGameboard";
    table1.classList.add("board");
    table2.classList.add("board");
    table3.classList.add("board");
    table4.classList.add("board");

    if (game.player1.isTurn || game.end) {
      container.appendChild(header1);
      container.appendChild(header2);
      container.appendChild(table1);
      container.appendChild(table2);
      this.drawGameboard(
        game.player2.gameboard,
        "player1EnemyGameboard",
        false,
        game.player1.isTurn
      );
      this.drawGameboard(game.player1.gameboard, "player1OwnGameboard", true);
    }
    if (game.player2.isTurn || game.end) {
      container.appendChild(header3);
      container.appendChild(header4);
      container.appendChild(table3);
      container.appendChild(table4);
      this.drawGameboard(
        game.player1.gameboard,
        "player2EnemyGameboard",
        false,
        game.player2.isTurn
      );
      this.drawGameboard(game.player2.gameboard, "player2OwnGameboard", true);
    }

    // Add event listener for attacking
    const f = document.getElementsByClassName("isTurn");
    for (let i = 0; i < f.length; i++) {
      f[i].addEventListener("click", evt => {
        game.attackLoop(evt, this);
      });
    }
  }

  drawGameboard(gameboard, boardId, own, turn = false) {
    let className = own ? "own" : "enemy";
    if (turn === true) {
      className += " isTurn";
    }
    const rows = [];
    for (let i = 0; i < 10; i++) {
      let string = "<tr>";
      for (let j = 0; j < 10; j++) {
        string +=
          "<td class = '" +
          className +
          "' id = '" +
          boardId +
          "_field" +
          i.toString() +
          j.toString() +
          "'>" +
          this.drawField(gameboard.fields[i][j]) +
          "</td>";
      }
      string += "</tr>";
      rows[i] = string;
    }
    document.getElementById(boardId).innerHTML = rows.join("");

    // Mark ships on gameboard
    this.markFields(boardId, gameboard, own);
  }

  drawAnnouncement(game) {
    let announcement = document.getElementById("announcement");
    if (game.end === false) {
      let playerTurn = game.player1.isTurn === true ? "1" : "2";
      announcement.innerHTML =
        "It's Player" +
        playerTurn +
        "'s turn. Shoot by clicking in the Enemy Gameboard.";
    } else {
      announcement.style.backgroundColor = "lightgreen";
      announcement.style.fontSize = "3em";
      announcement.style.color = "black";
      if (game.player1.isWinner === true) {
        announcement.innerHTML = "Game over! Player1 is the winner";
      } else if (game.player2.isWinner === true) {
        announcement.innerHTML = "Game over! Player2 is the winner";
      } else {
        announcement.innerHTML = "Game over! Draw! There is no winner.";
      }
    }
  }

  drawField(field) {
    if (field.state === "hit") {
      return "X";
    } else if (field.state === "miss") {
      return "O";
    } else {
      return "";
    }
  }

  markFields(boardId, gameboard, own) {
    // Mark own ships:
    // Own gameboard: blue: unsunken ships, red: sunken ships
    // Enemy gameboard: red: sunken ships

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (gameboard.fields[i][j].ship !== "") {
          let id = boardId + "_field" + i.toString() + j.toString();
          if (gameboard.ships[gameboard.fields[i][j].ship].sunk) {
            document.getElementById(id).classList.add("sunkenShip");
          } else {
            if (own === true) {
              document.getElementById(id).classList.add("unsunkenShip");
            }
          }
        }
      }
    }
  }

  showPassDeviceScreen(currentScreenId, nextStep) {
    let currentScreen = document.getElementById(currentScreenId);
    currentScreen.classList.toggle("invisible");
    let passDeviceScreen = document.getElementById("passDeviceScreen");
    passDeviceScreen.classList.toggle("invisible");
    let btnPassDevice = document.getElementById("btnPassDevice");
    btnPassDevice.addEventListener("click", nextStep);
  }
}

module.exports = Visualization;
