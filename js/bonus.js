let bonusMap = {
  confuse: {
    do(game) {
      confuse(game);
    },
    undo(game) {
      unconfuse(game);
    },
  },
  shrink: {
    do(game) {
      shrink(game);
    },
    undo(game) {
      unshrink(game);
    },
  },
  explode: {
    do(game) {
      explode(game);
    },
    undo(game) {
      unexplode(game);
    },
  },
  jolt: {
    do(game) {
      jolt(game);
    },
    undo(game) {
      unjolt(game);
    },
  },
};

let bonuses = Object.keys(bonusMap);

export function generateBonus(game, position = { x: 0, y: 0 }) {
  var bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
  console.log(bonus);
  let bonusBox = new BonusBox(game, bonus, position);
  game.gameObjects.push(bonusBox);
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

  deactivate(game) {
    this.action.undo(game);
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
    var index = this.game.gameObjects.indexOf(this);
    if (index !== -1) {
      this.game.gameObjects.splice(index, 1);
    }
  }
}

function confuse(game) {
  game.board.maxSpeed = -game.board.maxSpeed;
}

function unconfuse(game) {
  game.board.maxSpeed = -game.board.maxSpeed;
}

function shrink(game) {
  game.board.width = game.board.width / 2;
}

function unshrink(game) {
  game.board.width = game.board.width * 2;
}

function explode(game) {
  game.ball.bounceable = false;
}

function unexplode(game) {
  game.ball.bounceable = true;
}

function jolt(game) {
  game.ball.speed.x = game.ball.speed.x * 1.2;
  game.ball.speed.y = game.ball.speed.y * 1.2;
}

function unjolt(game) {}
