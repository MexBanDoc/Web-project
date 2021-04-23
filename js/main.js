import { Game } from "./game.js";

let canvas = document.getElementById("screen");

let context = canvas.getContext("2d");

// TODO: передавать размеры в update draw
// TODO: использовать размеры viewport
// * TODO: возможность изменять размеры игры
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

let game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
  // FIXME: нужен ли TimeDelta?
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
