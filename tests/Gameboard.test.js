const Gameboard = require("../src/Gameboard");
const Ship = require("../src/Ship");
const Player = require("../src/Player");

let gb = new Gameboard();

test("The gameboard has 10 x 10 fields", () => {
  expect(gb.fields.length).toBe(10);
  gb.fields.forEach(row => {
    expect(row.length).toBe(10);
  });
});

let currentNumberShips = gb.ships.length;
let iStart = 1;
let jStart = 2;
let length = 3;
gb.placeShip(iStart, jStart, length);

test("Placing a ship changes the length of the ships array", () => {
  expect(gb.ships.length).not.toBe(currentNumberShips);
});

test("Placing a ship horizontally changes the array fields correctly", () => {
  currentNumberShips = gb.ships.length;
  for (let j = jStart; j < jStart + length - 1; j++) {
    expect(gb.fields[iStart][j].ship).toBe(currentNumberShips - 1);
  }
  let counter = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gb.fields[i][j].ship === "") {
        counter++;
      }
    }
  }
  expect(counter).toBe(100 - length);
});

test("Placing a ship vertically changes the array fields correctly", () => {
  let gb2 = new Gameboard();
  let iStart2 = 6;
  let jStart2 = 7;
  let length2 = 4;
  gb2.placeShip(iStart2, jStart2, length2, false);
  let currentNumberShips2 = gb2.ships.length;
  for (let i = iStart2; i < iStart2 + length2 - 1; i++) {
    expect(gb2.fields[i][jStart2].ship).toBe(currentNumberShips2 - 1);
  }
});

test("The reset function works correctly", () => {
  gb.reset();
  expect(gb.ships.length).toBe(0);
  expect(
    gb.fields.every(row => {
      return (
        row.every(field => {
          return field.state === "" && field.ship === "";
        }) === true
      );
    })
  ).toBe(true);
});

test("The receiveAttack function attributes a hit to the correct ship, sets the field to hit and records a hit for the player", () => {
  gb.ships = [new Ship(3), new Ship(2)];
  gb.fields[2][3].ship = 1;
  let player = new Player(true);
  expect(player.hasHit).toBe(false);
  gb.receiveAttack(2, 3, player);
  expect(gb.ships[1].hits.length).toBe(1);
  expect(gb.fields[2][3].state).toBe("hit");
  expect(player.hasHit).toBe(true);
  let counter = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gb.fields[i][j].state !== "hit") {
        counter++;
      }
    }
  }
  expect(counter).toBe(99);
});

test("The receiveAttack function records a miss correctly", () => {
  gb.reset();
  let player = new Player(true);
  gb.receiveAttack(2, 3, player);
  expect(gb.fields[2][3].state).toBe("miss");
  let counter = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (gb.fields[i][j].state !== "miss") {
        counter++;
      }
    }
  }
  expect(counter).toBe(99);
});

test("The allShipsSunk function works correctly - Part 1", () => {
  gb.reset();
  gb.fields[0][2].state = "hit";
  gb.fields[1][9].state = "miss";
  expect(gb.allShipsSunk()).toBe(true);
});

test("The allShipsSunk function works correctly - Part 2", () => {
  gb.reset();
  gb.fields[0][2].state = "hit";
  gb.fields[1][9].state = "miss";
  gb.fields[3][9].ship = 2;
  expect(gb.allShipsSunk()).toBe(false);
});
