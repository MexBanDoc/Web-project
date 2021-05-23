import { Board } from "./board.js";
import { Ball } from "./ball.js";
import { KeyboardHandler } from "./keyboardHandler.js";
import { Brick } from "./brick.js";
import { ScoreBunner } from "./scoreBunner.js";

export class Game {
  constructor(settingManager, levelManager) {
    this.settingManager = settingManager;
    this.levelManager = levelManager;

    this.padding = 50;

    this.width = settingManager.gameWidth;
    this.height = settingManager.gameHeight - this.padding;

    this.imagesSrcPath = "../assets/images/";
    var imagesToLoad = [
      "background.png",
      "ball.png",
      "ball2.png",
      "ballCrit.png",
      "board.png",
      "diam.png",
      "brick.png",
      "bonus-confuse.png",
      "bonus-shrink.png",
      "bonus-explode.png",
      "bonus-jolt.png",
      "bonus-money.png",
      "bonus-range.png",
      "bonus-shield.png",
      "bonus-diam.png",
    ];
    this.images = {};
    for (let imgName of imagesToLoad) {
      let path = this.imagesSrcPath + imgName;
      let img = new Image();
      img.src = path;
      this.images[imgName.split(".")[0]] = img;
    }

    this.gameObjects = [];
    this.state = "Idle"; // "Idle" "Playing" "Paused" "Complete" "Failed"
    this.scoreChunk = 10;
    this.score = 0;
  }
  //TODO: вынести повышение счета в отдельный метод

  changeScore(delta){
    this.score += delta;
  }

  addObject(obj) {
    this.gameObjects.push(obj);
  }

  removeObject(obj) {
    var index = this.gameObjects.indexOf(obj);
    if (index !== -1) {
      this.gameObjects.splice(index, 1);
    }
  }

  setLevelByName(name) {
    this.currentLevel = name;
  }

  start() {
    this.score = 0;
    this.state = "Playing";
    this.settingManager.update();
    this.ball = new Ball(
      this,
      { x: this.width / 2, y: (this.height / 4) * 3 },
      { x: this.settingManager.ballSpeed / (2 ** 0.5), y: -this.settingManager.ballSpeed / (2 ** 0.5) }
    );

    this.board = new Board(this);
    this.scoreBunner = new ScoreBunner(
      this,
      { x: 0, y: this.height },
      this.padding
    );

    let bricks = this.levelManager.generateBricks(this, this.currentLevel);

    this.gameObjects = [this.ball, this.board, this.scoreBunner, ...bricks];

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

    if (brickCount === 0) {
      this.state = "Complete";
    }
  }

  draw(context) {
    context.drawImage(this.images["background"], 0, 0, this.width, this.height);

    this.gameObjects.forEach((obj) => obj.draw(context));
  }
}
