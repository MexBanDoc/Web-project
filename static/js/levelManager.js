import { Brick } from "./brick.js";

export class LevelManager {
  constructor(path) {
    this.path = path;
    this.levels = {
      "Level 0": [[1]],
      "Level 1": [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
      ],
      "Level 2": [
        [1, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0],
      ],
      "Level 3": [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
      ],
      "Level 4": [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      "Level 5": [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
      ],
      "Level 6": [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
      ],
      "Level 7": [
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [0, 0, 0, 1, 1, 0, 0, 0],
      ],
    };
  }

  loadLevels() {
    // var levelPaths = fs.readdirSync(path);
    // for (let level of levelPaths) {
    //   let json = require(path + '/' + level);
    //   console.log(json);
    //   this.levels[level] = json;
    // }
  }

  generateBricks(game, level) {
    // create bricks with configuration from sm
    let bricks = [];

    let bwidth = game.settingManager.brickWidth;
    let y = 0;
    let lines = this.levels[level];
    for (let line of lines) {
      let totalLen = bwidth * line.length;
      let start = (game.settingManager.gameWidth - totalLen) / 2;
      for (let bi = 0; bi < line.length; bi++) {
        if (line[bi] != 0) {
          let brick = new Brick(game, { x: start + bi * bwidth, y: y });
          bricks.push(brick);
        }
      }

      y += game.settingManager.brickHeight;
    }

    return bricks;
  }

  getLevelNames() {
    return Object.keys(this.levels);
  }
}
