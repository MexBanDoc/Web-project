import { Board } from "./board.js";
import { Ball } from "./ball.js";
import { KeyboardHandler } from "./keyboardHandler.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.ballImage = document.getElementById("ballImage");
    this.boardImage = document.getElementById("boardImage");
    this.backgroundImage = document.getElementById("backgroundImage");
  }

  start() {
    // TODO: Созлать класс блока, добавить в gameObjects
    this.ball = new Ball(this);
    this.board = new Board(this);

    this.gameObjects = [this.ball, this.board];

    this.keyboardHandler = new KeyboardHandler(this.board);
  }

  update(dt) {
    this.gameObjects.forEach((obj) => obj.update(dt));
  }

  draw(context) {
    context.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    this.gameObjects.forEach((obj) => obj.draw(context));
  }
}
