import { Board } from "./board.js";
import { Ball } from "./ball.js";
import { KeyboardHandler } from "./keyboardHandler.js";
import { Brick } from "./brick.js";

export class Game {
  constructor(settingManager, levelManager) {
    this.settingManager = settingManager;
    this.levelManager = levelManager;

    this.width = settingManager.gameWidth;
    this.height = settingManager.gameHeight;

    this.imagesSrcPath = "../assets/images/";
    var imagesToLoad = [
      "background.png",
      "ball.png",
      "board.png",
      "brick.png",
      "bonus-confuse.png",
      "bonus-shrink.png",
      "bonus-explode.png",
      "bonus-jolt.png",
    ];
    this.images = {};
    for (let imgName of imagesToLoad) {
      let path = this.imagesSrcPath + imgName;
      let img = new Image();
      img.src = path;
      this.images[imgName.split(".")[0]] = img;
    }

    this.currentLevel;
    this.state = "Idle"; // "Idle" "Playing" "Paused" "Complete" "Failed"
  }

  setLevelByName(name) {
    this.currentLevel = name;
  }

  start() {
    this.state = "Playing";
    this.settingManager.update();
    // TODO: Созлать класс блока, добавить в gameObjects
    this.ball = new Ball(
      this,
      { x: this.width / 2, y: (this.height / 4) * 3 },
      { x: this.settingManager.ballSpeed, y: -this.settingManager.ballSpeed }
    );

    this.board = new Board(this);

    let bricks = this.levelManager.convertToBricks(this, this.currentLevel);

    this.gameObjects = [this.ball, this.board, ...bricks];

    this.keyboardHandler = new KeyboardHandler(this.board);
  }

  update(dt) {
    let brickCount = 0;
    for (let obj of this.gameObjects) {
      if (obj instanceof Brick) {
        brickCount++;
      }

      obj.update(dt);
    }

    if (brickCount == 0) {
      this.state = "Complete";
    }
  }

  draw(context) {
    context.drawImage(this.images["background"], 0, 0, this.width, this.height);
    this.gameObjects.forEach((obj) => obj.draw(context));
  }
}
