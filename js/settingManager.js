export class SettingManager {
  // init settings
  constructor() {
    // game
    this.gameWidth = 800;
    this.gameHeight = 600;

    // ball
    this.ballSize = 50;
    this.ballSpeed = 5;

    // brick
    this.brickWidth = 100;
    this.brickHeight = 35;

    // board
    this.boardWidth = 200;
    this.boardHeight = 25;

    // bonus
    this.bonusWidth = 50;
    this.bonusHeight = 50;
    this.bonusChance = 0.4;
  }

  update() {
    // let menuTag = document.getElementById("optionsMenu");
    this.ballSpeed = parseInt(document.getElementById("ballSpeedInput").value);
    this.boardWidth = parseInt(document.getElementById("boardSizeInput").value);
    //TODO: вынести настройки куда-нибудь из инпутов
    this.bonusChance = parseFloat(
      document.getElementById("bonusChanceInput").value
    );
  }
}
