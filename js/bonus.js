import { Brick } from "./brick.js";
import { Bullet } from "./bullet.js";

let bonusMap = {
  confuse: {
    do(game) {
      confuse(game);
    },
  },
  shrink: {
    do(game) {
      shrink(game);
    },
  },
  explode: {
    do(game) {
      explode(game);
    },
  },
  jolt: {
    do(game) {
      jolt(game);
    },
  },
  diam: {
    do(game) {
      increseScore(game);
    },
  },
  shield: {
    do(game) {
      shield(game);
    },
  },
  range: {
    do(game) {
      range(game);
    },
  },
};

let bonuses = Object.keys(bonusMap);

export function generateBonus(game, position = { x: 0, y: 0 }) {
  var bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
  let bonusBox = new BonusBox(game, bonus, position);
  game.addObject(bonusBox);
}

export class BonusBox {
  constructor(game, type = "confuse", position = { x: 0, y: 0 }) {
    this.game = game;
    this.type = type;
    this.action = bonusMap[type];
    this.image = game.images["bonus-" + type];
    this.width = game.settingManager.bonusWidth;
    this.height = game.settingManager.bonusHeight;

    this.position = position;
    this.speed = { x: 0, y: 3 };
  }

  activate(game) {
    this.action.do(game);
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(dt) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    this.handleCollisions();
  }

  handleCollisions() {
    if (this.position.y + this.size > this.game.height) {
      this.hit();
      return;
    }

    let obj = this.game.board;

    if (
      obj.position.x <= this.position.x + this.width / 2 &&
      this.position.x + this.width / 2 <= obj.position.x + obj.width
    ) {
      if (
        obj.position.y + obj.height >= this.position.y &&
        this.position.y + this.height >= obj.position.y
      ) {
        obj.hit();
        this.hit();
        this.activate(this.game);
      }
    }
  }

  hit() {
    this.game.removeObject(this);
  }
}

function confuse(game) {
  game.board.maxSpeed = -game.board.maxSpeed;
}

function shrink(game) {
  game.board.width = game.board.width / 2;
}

function explode(game) {
  game.ball.image = game.images["ballCrit"];
  game.ball.bounceable = false;
}

function jolt(game) {
  game.ball.speed.x = game.ball.speed.x * 1.2;
  game.ball.speed.y = game.ball.speed.y * 1.2;
}

function increseScore(game) {
  game.score += game.scoreChunk;
}

function shield(game) {
  let shield = new Brick(game, { x: 0, y: game.height - 10 });
  shield.height = 10;
  shield.width = game.width;
  game.addObject(shield);
}

function range(game) {
  game.board.bonus = {
    left: 3,
    activate() {
      this.left--;
      if (this.left < 0) {
        game.board.bonus = null;
      }

      let radius = 25;
      let bullet1 = new Bullet(
        game,
        { x: game.board.position.x, y: game.board.position.y },
        { x: 0, y: -10 },
        radius
      );
      let bullet2 = new Bullet(
        game,
        {
          x: game.board.position.x + game.board.width - radius * 2,
          y: game.board.position.y,
        },
        { x: 0, y: -10 },
        radius
      );
      game.addObject(bullet1);
      game.addObject(bullet2);
    },
    deactivate() {},
  };
}
