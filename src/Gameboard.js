const Ship = require("../src/Ship");
const { getLength } = require("../src/positionShipsHelpers");

class Gameboard {
  constructor() {
    this.fields = [
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ],
      [
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" },
        { ship: "", state: "" }
      ]
    ];
    this.ships = [];
  }

  reset() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.fields[i][j] = { ship: "", state: "" };
      }
    }
    this.ships = [];
  }

  placeShips() {
    let ships = document.querySelectorAll(".posUnsunkenShip");
    ships.forEach(ship => {
      // Find the necessary informations for all ships and call placeShip for them
      let shipClasses = [...ship.classList];
      let orientation = shipClasses.includes("hor") ? true : false;
      let length = getLength(shipClasses);
      let parent = ship.parentElement.id;
      let iStart = parseInt(ship.parentElement.id[0]);
      let jStart = parseInt(ship.parentElement.id[1]);
      this.placeShip(iStart, jStart, length, orientation);
    });
  }

  placeShip(iStart, jStart, length, horizontal = true) {
    this.ships.push(new Ship(length));

    if (horizontal) {
      for (let j = jStart; j < jStart + length; j++) {
        this.fields[iStart][j].ship = this.ships.length - 1; // fill fields with index of ship
      }
    } else {
      //vertical
      for (let i = iStart; i < iStart + length; i++) {
        this.fields[i][jStart].ship = this.ships.length - 1; // fill fields with index of ship
      }
    }
  }

  receiveAttack(i, j, player) {
    if (this.fields[i][j].ship !== "") {
      this.fields[i][j].state = "hit";
      this.ships[this.fields[i][j].ship].hit();
      player.hasHit = true;
    } else {
      this.fields[i][j].state = "miss";
    }
  }

  allShipsSunk() {
    return this.fields.every(row => {
      return (
        row.every(field => {
          return (
            field.ship === "" ||
            (field.state === "hit" || field.state === "miss")
          );
        }) === true
      );
    });
  }
}

module.exports = Gameboard;
