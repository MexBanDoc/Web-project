import { Board } from "./board.js";
import { Ball } from "./ball.js";
import { KeyboardHandler } from "./keyboardHandler.js";
import { Brick } from "./brick.js";
import { ScoreBanner } from "./scoreBanner.js";

export class Game {
  constructor(settingManager, levelManager, audioManager) {
    this.settingManager = settingManager;
    this.levelManager = levelManager;
    this.audioManager = audioManager;

    // this.padding = 50;
    this.padding = this.settingManager.scoreBoardHeight; //50; // FIXME: hardcode

    this.width = settingManager.gameWidth;
    this.height = settingManager.gameHeight - this.padding;

    this.imagesSrcPath = "../static/assets/images/";
    var imagesToLoad = [
      "background.png",
      "ball.png",
      "ball2.png",
      "ballCrit.png",
      "board.png",
      "diam.png",
      "brick.png",
      "shieldy.png",
      "bonus-confuse.png",
      "bonus-shrink.png",
      "bonus-explode.png",
      "bonus-jolt.png",
      "bonus-money.png",
      "bonus-range.png",
      "bonus-shield.png",
      "bonus-diam.png",
      "heart.png",
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

    this.bonuses = new Set();
  }

  changeScore(delta) {
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

  pause() {
    this.state = "Paused";
  }

  stop() {
    this.scoreBanner.stopTimer();
    this.keyboardHandler.dispose();
    this.state = "Fail";
  }

  fail() {
    this.state = "Fail";
  }

  start() {
    // this.audioManager.audios['s1'].play();
    this.resetBonuses();
    this.lives = 5;
    this.score = 0;
    this.state = "Idle";
    this.settingManager.update();
    this.ball = new Ball(
      this,
      { x: this.width / 2, y: (this.height / 4) * 3 },
      {
        x: this.settingManager.ballSpeed / 2 ** 0.5,
        y: -this.settingManager.ballSpeed / 2 ** 0.5,
      },
      this.settingManager.ballSize / 2
    );



    this.board = new Board(this);
    this.board.baseSpeed = this.settingManager.boardSpeed;
    this.scoreBanner = new ScoreBanner(
      this,
      { x: 0, y: this.height },
      this.padding
    );

    let bricks = this.levelManager.generateBricks(this, this.currentLevel);

    this.gameObjects = [this.ball, this.board, this.scoreBanner, ...bricks];

    this.keyboardHandler = new KeyboardHandler(this.board);

    this.scoreBanner.startTimer();

  }

  looseBall() {
    this.audioManager.tryPlay('ballLoss');
    this.state = "Idle";
    this.lives--;
    if (this.lives < 0) {
      this.state = "Fail";
      return;
    }
    this.resetBonuses();
    this.resetBall();
  }

  resetBonuses(){
    this.bonuses.forEach((b) => b.deactivate(this));
    this.bonuses = new Set();
  }

  resetBall() {
    this.ball.speed = { x: 0, y: 0 };
    this.ball.position.x = this.board.position.x;
    this.ball.position.y = this.board.position.y;
    this.ball.position.y -= this.ball.size;
    this.ball.position.x += this.board.width / 2 - this.ball.size / 2 ;
    this.ball.image = this.images["ball"];
    this.ball.bounceable = true;
  }

  continue() {
    this.state = "Playing";
    if (this.ball.speed.x === 0 && this.ball.speed.y === 0) {
      this.ball.speed = { x: 0, y: -this.settingManager.ballSpeed }; // init speed
    }
  }

  updateSizes() {
    let defWidth = 800;
    let defHeight = 600;

    let whProportion = defHeight / defWidth;
    let hwProportion = defWidth / defHeight;

    let swidth = getWidth();
    let sheight = getHeight();

    let width = Math.min(swidth, defWidth);
    if (swidth <= defWidth) {
      width -= 20;
    }
    let height = whProportion * width;
    if (height >= sheight * 0.7) {
      height = sheight * 0.7;
      width = hwProportion * height;
    }
    return width;
    this.settingManager.setBaseSize(width, height);
    this.padding = this.settingManager.scoreBoardHeight;
    this.width = this.settingManager.gameWidth;
    this.height = this.settingManager.gameHeight - this.padding;
  }

  update(dt) {
    let brickCount = 0;
    for (let obj of this.gameObjects) {
      if (obj instanceof Brick && obj.meta != "shield" && !obj.indestructible) {
        brickCount++;
      }

      obj.update(dt);
    }

    if (brickCount === 0) {
      this.state = "Complete";
    }

    if (this.state === "Idle") {
      this.resetBall();
    }
  }

  draw(context) {
    context.drawImage(this.images["background"], 0, 0, this.width, this.height);

    this.gameObjects.forEach((obj) => obj.draw(context));
  }
}

function getWidth() {
  return document.documentElement.clientWidth;
}

function getHeight() {
  return document.documentElement.clientHeight;
}
