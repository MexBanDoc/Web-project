import { Game } from "./game.js";
import { LevelManager } from "./levelManager.js";
import { SettingManager } from "./settingManager.js";

let canvas = document.getElementById("screen");
let context = canvas.getContext("2d");

let lm = new LevelManager("levels");
let sm = new SettingManager();

// TODO: передавать размеры в update draw
// TODO: использовать размеры viewport
// * TODO: возможность изменять размеры игры

sm.gameWeight = canvas.width;
sm.gameHeight = canvas.height;

let game = new Game(sm, lm);

let loopStop = false;
let lastTime = 0;

function gameLoop(timestamp) {
  if (loopStop) {
    return;
  }

  if (game.state === "Fail") {
    stopGame();
    showFail();
    return;
  }

  if (game.state === "Complete") {
    stopGame();
    showWin();
    return;
  }

  // FIXME: нужен ли TimeDelta?
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  context.clearRect(0, 0, sm.gameWeight, sm.gameHeight);

  if (game.state != "Paused") {
    game.update(dt);
  }
  game.draw(context);

  requestAnimationFrame(gameLoop);
}

function startGame() {
  // game.updateSizes();
  // let width = game.updateSizes();
  // canvas.style.width = width + "px";
  // canvas.style.height = (600 / 800) * width + "px";
  updateGameSize();
  game.start();
  loopStop = false;
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  // game.keyboardHandler.dispose();
  game.stop();
  loopStop = true;
}

// handlers assignment
let startBtn = document.querySelector(".StartBtn");
startBtn.addEventListener("click", switchToLevelSelect);

let optionsBtn = document.querySelector(".OptionsBtn");
optionsBtn.addEventListener("click", switchToOptionSelect);

let levelBtns = document.querySelectorAll("#levelMenu .level");
for (let levelBtn of levelBtns) {
  levelBtn.addEventListener("click", selectLevelAndStart);
}

let restartCurrentLevelBtn = document.querySelector("#fail > .level");
restartCurrentLevelBtn.addEventListener("click", startCurrentLevelFromFail);

let backFromOptionsBtn = document.querySelector("#optionsMenu > .back");
backFromOptionsBtn.addEventListener("click", returnFromOptions);

let backFromLevelsBtn = document.querySelector("#levelMenu > .back");
backFromLevelsBtn.addEventListener("click", returnFromLevels);

let selectLevelFromWinBtn = document.querySelector("#win > .level");
selectLevelFromWinBtn.addEventListener("click", chooseLevelFromWin);

let backFromWinBtn = document.querySelector("#win > .back");
backFromWinBtn.addEventListener("click", returnFromWin);

let backFromFailBtn = document.querySelector("#fail > .back");
backFromFailBtn.addEventListener("click", returnFail);

let backFromGameBtn = document.querySelector(
  "#gameScene .navigation > .back"
);
backFromGameBtn.addEventListener("click", returnFromGame);

let controlsBtn = document.querySelector(
  "#gameScene .navigation > .controls"
);
controlsBtn.addEventListener("click", toggleControls);

let pauseGameBtn = document.querySelector("#gameScene .navigation > .pause");
pauseGameBtn.addEventListener("click", togglePause);

let restartGameBtn = document.querySelector(
  "#gameScene .navigation > .restart"
);
restartGameBtn.addEventListener("click", restartLevel);

let mainMenu = document.getElementById("mainMenu");
let levelMenu = document.getElementById("levelMenu");
let optionsMenu = document.getElementById("optionsMenu");
let gameScene = document.getElementById("gameScene");

let win = document.getElementById("win");
let fail = document.getElementById("fail");

// handlers
function switchToLevelSelect(value) {
  mainMenu.classList.add("hide");
  levelMenu.classList.remove("hide");
}

function switchToOptionSelect(value) {
  mainMenu.classList.add("hide");
  optionsMenu.classList.remove("hide");
}

function selectLevelAndStart(value) {
  levelMenu.classList.add("hide");
  gameScene.classList.remove("hide");
  let levelName = value.target.textContent;
  game.setLevelByName(levelName);

  startGame();
}

function returnFromOptions(value) {
  optionsMenu.classList.add("hide");
  mainMenu.classList.remove("hide");
}

function returnFromLevels(value) {
  levelMenu.classList.add("hide");
  mainMenu.classList.remove("hide");
}

// Game Result
function showWin(value) {
  gameScene.classList.add("hide");

  let score = document.querySelector("#win > .score");
  let time = document.querySelector("#win > .time");

  score.textContent = "Score: " + game.score;
  time.textContent = "Time: " + game.scoreBanner.timeStr;

  win.classList.remove("hide");
}

function showFail(value) {
  gameScene.classList.add("hide");
  fail.classList.remove("hide");
}

function returnFromWin(value) {
  win.classList.add("hide");
  mainMenu.classList.remove("hide");
}

function returnFail(value) {
  fail.classList.add("hide");
  mainMenu.classList.remove("hide");
}

function returnFromGame(value) {
  stopGame();
  gameScene.classList.add("hide");
  mainMenu.classList.remove("hide");
}

function togglePause(value) {
  if (game.state != "Paused") {
    value.target.textContent = "Continue";
    game.pause();
  } else {
    value.target.textContent = "Pause";
    game.continue();
  }
}

function restartLevel(value) {
  game.fail();
}

function startCurrentLevelFromFail(value) {
  fail.classList.add("hide");
  gameScene.classList.remove("hide");

  startGame();
}

function chooseLevelFromWin(value) {
  win.classList.add("hide");
  levelMenu.classList.remove("hide");
}

let controlMode = false;
function toggleControls(value) {
  let controls = document.querySelectorAll(".controller");
  for (let control of controls) {
    if (controlMode) {
      control.classList.add("hide");
    } else {
      control.classList.remove("hide");
    }
  }
  controlMode = !controlMode;
}

let leftBtn = document.querySelector(".controller .left");
let rightBtn = document.querySelector(".controller .right");
let actionBtn = document.querySelector(".controller .action");
let throwBtn = document.querySelector(".controller .throw");

leftBtn.addEventListener("mousedown", function (event) {
  game.board.moveLeft();
});

leftBtn.addEventListener("mouseup", function (event) {
  game.board.stopMovingLeft();
});

rightBtn.addEventListener("mousedown", function (event) {
  game.board.moveRight();
});

rightBtn.addEventListener("mouseup", function (event) {
  game.board.stopMovingRight();
});

actionBtn.addEventListener("mousedown", function (event) {
  game.board.useBonus();
});

actionBtn.addEventListener("mouseup", function (event) {
  game.board.stopBonus();
});

throwBtn.addEventListener("mousedown", function (event) {
  if (game.state === "Idle") {
    game.continue();
  }
});


let gameArea = document.querySelector("#gameScene > .gameArea");
window.addEventListener(
  "resize",
  updateGameSize,
  true
);

function updateGameSize(event) {
  let width = game.updateSizes();
  gameArea.style.width = width + "px";
  canvas.style.width = "100%";
  canvas.style.height = (600 / 800) * width + "px";
}
