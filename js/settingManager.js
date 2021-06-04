export class SettingManager {
  // init settings
  constructor(gameWidth = 800, gameHeight = 600) {
    // game
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    //fractions
    // ball
    this.ballSizeProportion = getProportion(50, 800); // 0.0625;
    this.ballSpeedProportion = getProportion(5, 800); // 0.0625;

    // this.ballSpeed = 5;

    // brick
    this.brickWidthProportion = getProportion(100, 800); //0.125;
    this.brickHeightProportion = getProportion(35, 800); //0.04375;

    // board
    this.boardWidthProportion = getProportion(200, 800); //0.25;
    this.boardHeightProportion = getProportion(25, 800); //0.03125;

    // bonus
    this.bonusWidthProportion = getProportion(50, 800); //0.0625;
    this.bonusHeightProportion = getProportion(50, 800); //0.0625;

    this.bonusChance = 0.4;

    this.scoreBoardHeightProportion = getProportion(50, 800);

    this.recalcSizes();
  }

  setBaseSize(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.recalcSizes();
  }

  recalcSizes() {
    this.ballSize = this.ballSizeProportion * this.gameWidth; //50;
    this.ballSpeed = this.ballSpeedProportion * this.gameWidth;

    this.brickWidth = this.brickWidthProportion * this.gameWidth; //100;
    this.brickHeight = this.brickHeightProportion * this.gameWidth; //35;

    this.boardWidth = this.boardWidthProportion * this.gameWidth; //200;
    this.boardHeight = this.boardHeightProportion * this.gameWidth; //25;

    this.bonusWidth = this.bonusWidthProportion * this.gameWidth; //50;
    this.bonusHeight = this.bonusHeightProportion * this.gameWidth; //50;

    this.scoreBoardHeight = this.scoreBoardHeightProportion * this.gameWidth;
  }

  update() {
    let ballSpeed = parseInt(document.getElementById("ballSpeedInput").value);
    this.ballSpeed = (this.gameWidth / 800) * ballSpeed;
    let boardWidth = parseInt(document.getElementById("boardSizeInput").value);
    this.boardWidth = (this.gameWidth / 800) * boardWidth;

    //TODO: вынести настройки куда-нибудь из инпутов
    this.bonusChance = parseFloat(
      document.getElementById("bonusChanceInput").value
    );
  }
}

function getProportion(size, relativeSize) {
  return size / relativeSize;
}
