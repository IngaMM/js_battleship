const Gameboard = require("../src/Gameboard");

class Player {
  constructor(isTurn) {
    this.gameboard = new Gameboard();
    this.isTurn = isTurn;
    this.isComputer = false;
    this.hasHit = false;
    this.isWinner = false;
  }

  attack(i, j, enemyGameboard) {
    if (enemyGameboard.fields[i][j].state === "") {
      enemyGameboard.receiveAttack(i, j, this);
    }
  }

  computerPlay(enemyGameboard) {
    // Make an array of the coordinates of all valid fields (not "hit" or "miss") that are adjacent to a previous "hits" that do not belong to a sunken ship
    let fieldsToChooseFrom = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (enemyGameboard.fields[i][j].state === "") {
          let hitAdjacent = false;
          let field = null;
          if (i > 0) {
            field = enemyGameboard.fields[i - 1][j];
            hitAdjacent =
              field.state === "hit" &&
              enemyGameboard.ships[field.ship].sunk === false;
          }
          if (i < 9 && hitAdjacent === false) {
            field = enemyGameboard.fields[i + 1][j];
            hitAdjacent =
              field.state === "hit" &&
              enemyGameboard.ships[field.ship].sunk === false;
          }
          if (j > 0 && hitAdjacent === false) {
            field = enemyGameboard.fields[i][j - 1];
            hitAdjacent =
              field.state === "hit" &&
              enemyGameboard.ships[field.ship].sunk === false;
          }
          if (j < 9 && hitAdjacent === false) {
            field = enemyGameboard.fields[i][j + 1];
            hitAdjacent =
              field.state === "hit" &&
              enemyGameboard.ships[field.ship].sunk === false;
          }

          if (hitAdjacent === true) {
            fieldsToChooseFrom.push([i, j]);
          }
        }
      }
    }

    // If there are no empty fields adjacent to previous "hits": Make an array of the coordinates of all valid fields
    if (fieldsToChooseFrom.length === 0) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (enemyGameboard.fields[i][j].state === "") {
            fieldsToChooseFrom.push([i, j]);
          }
        }
      }
    }
    // Select a random coordinate pair from this array
    let randomIndex = Math.floor(Math.random() * fieldsToChooseFrom.length);
    let attackI = fieldsToChooseFrom[randomIndex][0];
    let attackJ = fieldsToChooseFrom[randomIndex][1];
    // Attack
    this.attack(attackI, attackJ, enemyGameboard);

    // Return for testing purposes
    return fieldsToChooseFrom;
  }
}

module.exports = Player;
