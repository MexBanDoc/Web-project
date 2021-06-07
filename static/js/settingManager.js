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

    this.soundVolume = 0;

    this.currentDifficulty = "Normal";

    this.difficultySettings = {
      Easy: {
        ballSize: 25,
        ballSpeed: 5,
        boardWidth: 150,
        boardSpeed: 7,
      },
      Normal: {
        ballSize: 25,
        ballSpeed: 7,
        boardWidth: 125,
        boardSpeed: 10,
      },
      Hard: {
        ballSize: 25,
        ballSpeed: 10,
        boardWidth: 100,
        boardSpeed: 13,
      }
    }
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

    this.currentDifficulty = document.getElementById("easyDifficultyChoice").checked ? "Easy"
        : document.getElementById("normalDifficultyChoice").checked ? "Normal" : "Hard";


    this.ballSize = (this.gameWidth / 800) * this.difficultySettings[this.currentDifficulty].ballSize;
    this.ballSpeed = (this.gameWidth / 800) * this.difficultySettings[this.currentDifficulty].ballSpeed;

    this.boardWidth = (this.gameWidth / 800) * this.difficultySettings[this.currentDifficulty].boardWidth;
    this.boardSpeed = (this.gameWidth / 800) * this.difficultySettings[this.currentDifficulty].boardSpeed;

    this.soundVolume = parseInt(document.getElementById("musicVolumeInput").value) / 100;
    this.backgroundAudio = document.getElementById("backgroundMusicInput").checked;

    this.bonusChance = 0.1;
  }
}

function getProportion(size, relativeSize) {
  return size / relativeSize;
}
