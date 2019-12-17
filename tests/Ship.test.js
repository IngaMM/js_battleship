const Ship = require("../src/Ship");

let length = 3;
let ship = new Ship(length);
let length2 = 5;
let ship2 = new Ship(length2);

test("The ship has the correct length", () => {
  expect(ship.length).toBe(length);
});

test("It also works with another length", () => {
  expect(ship2.length).toBe(length2);
});

test("Sunk is false after initialization", () => {
  expect(ship.sunk).toBe(false);
});

test("The function hit works correctly", () => {
  ship.hit();
  expect(ship.hits.length).toBe(1);
});

test("The function isSunk works correctly - Part 1", () => {
  ship.hits = [true, true];
  ship.hit();
  expect(ship.sunk).toBe(true);
});

test("The function isSunk works correctly - Part 2", () => {
  ship.hits = [true];
  ship.hit();
  expect(ship.sunk).toBe(false);
});
