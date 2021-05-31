export class Board {
  constructor(game) {
    this.game = game;
    this.image = game.images["board"];
    this.width = game.settingManager.boardWidth;
    this.height = game.settingManager.boardHeight;

    this.baseSpeed = 5;

    this.moving = {Up : false, Down: false, Left: false, Right: false}

    this.position = {
      x: game.width / 2 - this.width / 2,
      y: game.height - this.height - 10,
    };

    this.bonus = null;
  }

  moveLeft() {
    this.moving.Left = true;
  }

  stopMovingLeft() {
    this.moving.Left = false;
  }

  moveRight() {
    this.moving.Right = true;
  }

  stopMovingRight() {
    this.moving.Right = false;
  }

  moveUp() {
    this.moving.Up = true;
  }

  stopMovingUp() {
    this.moving.Up = false;
  }

  moveDown() {
    this.moving.Down = true;
  }

  stopMovingDown() {
    this.moving.Down = false;
  }

  // FIXME: Out of order
  useBonus() {
    if (this.bonus) {
      this.bonus.activate(this.game);
    }
  }

  stopBonus() {
    if (this.bonus) {
      this.bonus.deactivate(this.game);
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    // context.font = '48px serif';
    // context.fillText(this.game.score, this.position.x, this.position.y + this.height, this.width);
  }

  update(dt) {
    this.position.x += this.baseSpeed * (this.moving.Right - this.moving.Left);
    this.position.y += this.baseSpeed * (this.moving.Down - this.moving.Up);

    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x + this.width > this.game.width) {
      this.position.x = this.game.width - this.width;
    }

    if (this.position.y < this.game.height * 2 / 3) {
      this.position.y = this.game.height * 2 / 3;
    }

    if (this.position.y + this.height > this.game.height) {
      this.position.y = this.game.height - this.height;
    }
  }

  hit() {}
}
