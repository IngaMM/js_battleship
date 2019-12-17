const Game = require("../src/Game");

let game = new Game();

test("The gameboards are assigned correctly to the players", () => {
  expect(game.player1.ownGameboard).toEqual(game.player2.enemyGameboard);
  expect(game.player2.ownGameboard).toEqual(game.player1.enemyGameboard);
});
