const Player = require("../src/Player");
const Gameboard = require("../src/Gameboard");
const Ship = require("../src/Ship");

let egb = new Gameboard();
let player = new Player();

test("The computer play function has the correct fieldsToChooseFrom for an empty board", () => {
  expect(player.computerPlay(egb).length).toBe(100);
});

test("The computer play function has the correct fieldsToChooseFrom for a board with a few misses", () => {
  egb.reset();
  egb.fields[2][3].state = "miss";
  egb.fields[5][1].state = "miss";
  egb.fields[7][1].state = "miss";
  expect(player.computerPlay(egb).length).toBe(97);
});

test("The computer play function has the correct fieldsToChooseFrom for a board with a hit in the middle on an unsunken ship", () => {
  egb.reset();
  egb.fields[4][4].state = "hit";
  egb.fields[4][4].ship = 0;
  let ship = new Ship(3);
  egb.ships = [ship];
  expect(player.computerPlay(egb).length).toBe(4);
});

test("The computer play function has the correct fieldsToChooseFrom for a board with a hit in the middle on a sunken ship", () => {
  egb.reset();
  egb.fields[4][4].state = "hit";
  egb.fields[4][4].ship = 0;
  let ship = new Ship(3);
  ship.sunk = true;
  egb.ships = [ship];
  expect(player.computerPlay(egb).length).toBe(99);
});

test("The computer play function has the correct fieldsToChooseFrom for a board with hits at edges and in corners on unsunken ships", () => {
  egb.reset();
  egb.fields[4][4].state = "hit";
  egb.fields[4][4].ship = 0;
  egb.fields[9][4].state = "hit";
  egb.fields[9][4].ship = 0;
  egb.fields[0][4].state = "hit";
  egb.fields[0][4].ship = 0;
  egb.fields[4][9].state = "hit";
  egb.fields[4][9].ship = 0;
  egb.fields[0][0].state = "hit";
  egb.fields[0][0].ship = 0;
  let ship = new Ship(3);
  egb.ships = [ship];
  expect(player.computerPlay(egb).length).toBe(15);
});
