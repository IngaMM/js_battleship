const Player = require("../src/Player");

class Game {
  constructor() {
    this.player1 = new Player(true);
    this.player2 = new Player(false);
    this.end = false;
  }

  start(game, vis) {
    game.player2.isComputer = document.getElementById("selectComputer").checked;
    vis.showPositioningScreen("Player1", game, game.player1.gameboard);
  }

  attackLoop(evt, vis) {
    let i = parseInt(evt.target.id[evt.target.id.length - 2]);
    let j = parseInt(evt.target.id[evt.target.id.length - 1]);
    // Exit if the attack is invalid (field occupied by "hit" or "miss")
    let enemy = this.player1.isTurn === true ? this.player2 : this.player1;
    let player = this.player1.isTurn === true ? this.player1 : this.player2;

    // Return if the attack is invalid (field occupied by "hit" or "miss")
    if (
      enemy.gameboard.fields[i][j].state === "hit" ||
      enemy.gameboard.fields[i][j].state === "miss"
    ) {
      return;
    }

    enemy.gameboard.receiveAttack(i, j, player);

    // Check if game is over
    this.end = this.endGame(player, enemy);
    if (this.end) {
      vis.drawGameboards(this);
      return;
    }

    this.changeTurns();

    // Show passDeviceScreen if player2 is not the computer & if the shoot was not a hit
    if (
      !this.player2.isComputer &&
      enemy.gameboard.fields[i][j].state !== "hit"
    ) {
      vis.showPassDeviceScreen("playScreen", vis.drawGameboards(this));
    } else {
      vis.drawGameboards(this);
    }

    while (this.player2.isComputer === true && this.player2.isTurn === true) {
      this.player2.computerPlay(this.player1.gameboard);
      // Check if game is over
      this.end = this.endGame(this.player2, this.player1);
      if (this.end) {
        vis.drawGameboards(this);
        return;
      }
      this.changeTurns();
      vis.drawGameboards(this);
    }
  }

  changeTurns() {
    let currentPlayer =
      this.player1.isTurn === true ? this.player1 : this.player2;
    if (currentPlayer.hasHit !== true) {
      this.player1.isTurn = !this.player1.isTurn;
      this.player2.isTurn = !this.player2.isTurn;
      let enemyFields = [...document.getElementsByClassName("enemy")];
      enemyFields.forEach(field => {
        field.classList.toggle("isTurn");
      });
    }
    currentPlayer.hasHit = false;
  }

  endGame(player, enemy) {
    if (enemy.gameboard.allShipsSunk() === true) {
      // Check for empty fields on enemy gameboard: if 1: draw, if > 1: player is winner
      let counter = 0;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (enemy.gameboard.fields[i][j].state === "") {
            counter++;
          }
        }
      }

      if (counter !== 1) {
        player.isWinner = true;
      }
      player.isTurn = false;
      enemy.isTurn = false;
      return true;
    }
    return false;
  }
}

module.exports = Game;
