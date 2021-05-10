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

  if (game.state == "Fail") {
    stopGame();
    showFail();
    return;
  }

  if (game.state == "Complete") {
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
  game.start();
  loopStop = false;
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  game.keyboardHandler.dispose();
  loopStop = true;
}

// handlers assignment
let startBtn = document.querySelector(".StartBtn");
startBtn.addEventListener("click", switchToLevelSelect);

let optionsBtn = document.querySelector(".OptionsBtn");
optionsBtn.addEventListener("click", switchToOptionSelect);

let levels = document.querySelectorAll(".level");
for (let level of levels) {
  level.addEventListener("click", selectLevelAndStart);
}

let backFromOptions = document.querySelector("#optionsMenu > .back");
backFromOptions.addEventListener("click", returnFromOptions);

let backFromLevels = document.querySelector("#levelMenu > .back");
backFromLevels.addEventListener("click", returnFromLevels);

let backFromWin = document.querySelector("#win > .back");
backFromWin.addEventListener("click", returnFromWin);

let backFromFail = document.querySelector("#fail > .back");
backFromFail.addEventListener("click", returnFail);

let mainMenu = document.getElementById("mainMenu");
let levelMenu = document.getElementById("levelMenu");
let optionsMenu = document.getElementById("optionsMenu");
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
  canvas.classList.remove("hide");
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
  canvas.classList.add("hide");
  win.classList.remove("hide");
}

function showFail(value) {
  canvas.classList.add("hide");
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

