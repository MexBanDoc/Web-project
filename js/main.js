import {Board} from "./board.js";
import {KeyboardHandler} from "./keyboardHandler.js";

let canvas = document.getElementById("screen");

let context = canvas.getContext("2d");



const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// console.log(CANVAS_WIDTH, CANVAS_HEIGHT)

context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);




let board = new Board(CANVAS_WIDTH, CANVAS_HEIGHT);
// console.log(board);
board.draw(context);

let keyboardHandler = new KeyboardHandler(board);

let lastTime = 0;

function gameLoop(timestamp) {
    let dt  = timestamp - lastTime;
    lastTime = timestamp;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    board.updateLocation(dt);
    board.draw(context);

    requestAnimationFrame(gameLoop);
}

function startGame() {
    requestAnimationFrame(gameLoop);
}


startGame();