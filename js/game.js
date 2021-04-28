import { Board } from "./board.js";
import { Ball } from "./ball.js";
import { KeyboardHandler } from "./keyboardHandler.js";
import { Brick } from "./brick.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.imagesSrcPath = "../assets/images/";
    var imagesToLoad = ["background.png", "ball.png", "board.png", "brick.png"];
    this.images = {};
    for (let imgName of imagesToLoad) {
      let path = this.imagesSrcPath + imgName;
      let img = new Image();
      img.src = path;
      this.images[imgName.split(".")[0]] = img;
    }
  }

  start() {
    // TODO: Созлать класс блока, добавить в gameObjects
    this.ball = new Ball(
      this,
      { x: this.width / 2, y: this.height / 2 },
      { x: 2, y: -2 }
    );
    this.board = new Board(this);

    let bricks = [];
    for (let i = 0; i < 10; i++) {
      bricks.push(new Brick(this, { x: i * 100, y: 10 }));
    }

    for (let i = 0; i < 10; i++) {
      bricks.push(new Brick(this, { x: i * 100, y: 50 }));
    }

    this.gameObjects = [this.ball, this.board, ...bricks];

    this.keyboardHandler = new KeyboardHandler(this.board);
  }

  update(dt) {
    this.gameObjects.forEach((obj) => obj.update(dt));
  }

  draw(context) {
    context.drawImage(this.images["background"], 0, 0, this.width, this.height);
    this.gameObjects.forEach((obj) => obj.draw(context));
  }
}
