import { Game } from "./game.js";

let canvas = document.getElementById("screen");

let context = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

let game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  game.update(dt);
  game.draw(context);

  requestAnimationFrame(gameLoop);
}

function startGame() {
  requestAnimationFrame(gameLoop);
}

startGame();
