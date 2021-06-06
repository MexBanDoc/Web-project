import { Game } from "./game.js";
import { LevelManager } from "./levelManager.js";
import { SettingManager } from "./settingManager.js";
import { AudioManager } from "./audioManager.js";

let canvas = document.getElementById("screen");
let context = canvas.getContext("2d");

let levelManager = new LevelManager("levels");

let settingManager = new SettingManager();

let audioManager = new AudioManager();
audioManager.setUpSounds();
// TODO: передавать размеры в update draw
// TODO: использовать размеры viewport
// * TODO: возможность изменять размеры игры

settingManager.gameWeight = canvas.width;
settingManager.gameHeight = canvas.height;

let game = new Game(settingManager, levelManager, audioManager);

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
  context.clearRect(0, 0, settingManager.gameWeight, settingManager.gameHeight);

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
  checkMobile();
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

let referenceBtn = document.querySelector(".ReferenceBtn");
referenceBtn.addEventListener("click", switchToReference);

let levelBtns = document.querySelectorAll("#levelMenu .level");
for (let levelBtn of levelBtns) {
  levelBtn.addEventListener("click", selectLevelAndStart);
}

let restartCurrentLevelBtn = document.querySelector("#fail > .level");
restartCurrentLevelBtn.addEventListener("click", startCurrentLevelFromFail);

let backFromOptionsBtn = document.querySelector("#optionsMenu > .back");
// let backFromOptionsBtn = document.querySelector("#optionsMenu .back");
backFromOptionsBtn.addEventListener("click", returnFromOptions);

let backFromLevelsBtn = document.querySelector("#levelMenu > .back");
backFromLevelsBtn.addEventListener("click", returnFromLevels);

let backFromReferenceBtn = document.querySelector("#referenceMenu > .back");
backFromReferenceBtn.addEventListener("click", returnFromReference);


let selectLevelFromWinBtn = document.querySelector("#win > .level");
selectLevelFromWinBtn.addEventListener("click", chooseLevelFromWin);

let selectNextLevelFromWinBtn = document.querySelector("#win > .nextlevel");
selectNextLevelFromWinBtn.addEventListener("click", nextLevelFromWin);

let backFromWinBtn = document.querySelector("#win > .back");
backFromWinBtn.addEventListener("click", returnFromWin);

let backFromFailBtn = document.querySelector("#fail > .back");
backFromFailBtn.addEventListener("click", returnFail);

let backFromGameBtn = document.querySelector("#gameScene .navigation > .back");
backFromGameBtn.addEventListener("click", returnFromGame);

let controlsBtn = document.querySelector("#gameScene .navigation > .controls");
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
let referenceMenu = document.getElementById("referenceMenu");
let gameScene = document.getElementById("gameScene");

let win = document.getElementById("win");
let fail = document.getElementById("fail");

// handlers
function switchToLevelSelect(value) {
  mainMenu.classList.add("hide");
  levelMenu.classList.remove("hide");
}

function switchToReference(value) {
  mainMenu.classList.add("hide");
  referenceMenu.classList.remove("hide");
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

function returnFromReference(value) {
  referenceMenu.classList.add("hide");
  mainMenu.classList.remove("hide");
}

function returnFromLevels(value) {
  levelMenu.classList.add("hide");
  mainMenu.classList.remove("hide");
}

// Game Result
function showWin(value) {
  audioManager.tryPlay('win');
  gameScene.classList.add("hide");
  let level = game.currentLevel;
  let score = document.querySelector("#win > .score");
  let time = document.querySelector("#win > .time");
  let header = document.querySelector("#win > h2");
  header.textContent = `${level} complete`;

  score.textContent = "Score: " + game.score;
  time.textContent = "Time: " + game.scoreBanner.timeStr;

  let nextLevelBtn = document.querySelector('#win .nextlevel');
  // nextLevelBtn.classList.add('hide');
  nextLevelBtn.textContent = "Total Complete!";
  let nextLevelName = getNextLevelName(game.currentLevel);
  if (nextLevelName) {
    nextLevelBtn.textContent = "Next Level";
  }
  win.classList.remove("hide");
}

function showFail(value) {
  audioManager.tryPlay('fail');
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

function nextLevelFromWin(value) {
  let nextLevelName = getNextLevelName(game.currentLevel);
  if (nextLevelName) {
    game.setLevelByName(nextLevelName);
    startGame();
    win.classList.add("hide");
    gameScene.classList.remove("hide");
  }
  else {
    audioManager.tryPlay('winBtn');
  }
}

function getNextLevelName(levelNane) {
  let levelNames = game.levelManager.getLevelNames();
  let pos = levelNames.indexOf(levelNane);
  let nextPos = pos + 1;
  if (nextPos < levelNames.length) {
    return levelNames[nextPos];
  }
  return undefined;
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
let upBtn = document.querySelector(".controller .up");
let downBtn = document.querySelector(".controller .down");
let actionBtn = document.querySelector(".controller .action");
let throwBtn = document.querySelector(".controller .throw");

let mdown = "mousedown";
let mleave = "mouseleave";
let mup = "mouseup";
let tdown = "touchstart";
let tup = "touchend";

// NOTE: mouse controls
//left
leftBtn.addEventListener(mdown, (event) => game.board.moveLeft());

leftBtn.addEventListener(mup, (event) => game.board.stopMovingLeft());
leftBtn.addEventListener(mleave, (event) => game.board.stopMovingLeft());
//up
upBtn.addEventListener(mdown, (event) => game.board.moveUp());

upBtn.addEventListener(mup, (event) => game.board.stopMovingUp());
upBtn.addEventListener(mleave, (event) => game.board.stopMovingUp());
//right
rightBtn.addEventListener(mdown, (event) => game.board.moveRight());

rightBtn.addEventListener(mup, (event) => game.board.stopMovingRight());
rightBtn.addEventListener(mleave, (event) => game.board.stopMovingRight());
//down
downBtn.addEventListener(mdown, (event) => game.board.moveDown());

downBtn.addEventListener(mup, (event) => game.board.stopMovingDown());
downBtn.addEventListener(mleave, (event) => game.board.stopMovingDown());

//action
actionBtn.addEventListener(mdown, (event) => game.board.useBonus());

actionBtn.addEventListener(mup, (event) => game.board.stopBonus());

//throw
throwBtn.addEventListener(mdown, function (event) {
  if (game.state === "Idle") {
    game.continue();
  }
});

// NOTE: touch controls
//left
leftBtn.addEventListener(tdown, (event) => game.board.moveLeft());

leftBtn.addEventListener(tup, (event) => game.board.stopMovingLeft());
gameScene.addEventListener(tup, (event) => game.board.stopMovingLeft());
//up
upBtn.addEventListener(tdown, (event) => game.board.moveUp());

upBtn.addEventListener(tup, (event) => game.board.stopMovingUp());
gameScene.addEventListener(tup, (event) => game.board.stopMovingUp());
//right
rightBtn.addEventListener(tdown, (event) => game.board.moveRight());

rightBtn.addEventListener(tup, (event) => game.board.stopMovingRight());
gameScene.addEventListener(tup, (event) => game.board.stopMovingRight());
//down
downBtn.addEventListener(tdown, (event) => game.board.moveDown());

downBtn.addEventListener(tup, (event) => game.board.stopMovingDown());
gameScene.addEventListener(tup, (event) => game.board.stopMovingDown());
//bonus
actionBtn.addEventListener(tdown, (event) => game.board.useBonus());

actionBtn.addEventListener(tup, (event) => game.board.stopBonus());

throwBtn.addEventListener(tdown, function (event) {
  if (game.state === "Idle") {
    game.continue();
  }
});


let bonusList = document.getElementById("bonusList");
let contolList = document.getElementById("contolList");


let bonusListBtn = document.querySelector(".bonusListBtn");
bonusListBtn.addEventListener('click', showBonusList)
let contolListBtn = document.querySelector(".contolListBtn");
contolListBtn.addEventListener('click', showControlList)


function showBonusList(event) {
  contolList.classList.add("hide");
  bonusList.classList.remove("hide");
}

function showControlList(event) {
  bonusList.classList.add("hide");
  contolList.classList.remove("hide");
}


let gameArea = document.querySelector("#gameScene > .gameArea");
window.addEventListener("resize", updateGameSize, true);
//window.addEventListener('resize', checkMobile, true);

function updateGameSize(event) {
  let width = game.updateSizes();
  gameArea.style.width = width + "px";
  canvas.style.width = "100%";
  canvas.style.height = (600 / 800) * width + "px";
}

function checkMobile(event){
  /*if(~['Android', 'iPhone', 'iPod', 'iPad', 'BlackBerry'].indexOf(navigator.platform)) {
      toggleControls();
  }*/
    if (screen.orientation !== 'indefined' && screen.orientation.type == 'portrait-primary'){
    controlMode=false;
  }
  else{
    controlMode=true;
  }
  toggleControls();
}


let buttons = document.body.getElementsByTagName("button");
for (let btn of buttons) {
  btn.addEventListener('click', playAudioBtn);
}

let backButtons = document.body.querySelectorAll(".back");
for (let btn of backButtons) {
  btn.removeEventListener('click', playAudioBtn);
  btn.addEventListener('click', playAudioBackBtn);
}


function playAudioBtn(event) {
  audioManager.tryPlay('button');
}

function playAudioBackBtn(event) {
  audioManager.tryPlay('backButton');
}

let applyBtn = document.querySelector('.apply');
applyBtn.addEventListener('click', applyOptions);

function applyOptions(event) {
  game.settingManager.update();
  game.audioManager.setVolume(game.settingManager.soundVolume);
  if (game.settingManager.backgroundAudio) {
    game.audioManager.tryPlay('background');
  }
  else {
    game.audioManager.stopSound('background');
  }
}