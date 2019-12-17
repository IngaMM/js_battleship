const Game = require("./Game");
const Visualization = require("./Visualization");
let game = new Game();
let vis = new Visualization();

document.getElementById("btnStartGame").addEventListener("click", () => {
  game.start(game, vis);
});
