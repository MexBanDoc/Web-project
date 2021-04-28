export class Board {
  constructor(game) {
    this.game = game;
    this.image = game.images['board'];
    this.width = 150;
    this.height = 20;

    this.maxSpeed = 10;
    this.speed = 0;
    this.ySpeed = 0;

    this.position = {
      x: game.width / 2 - this.width / 2,
      y: game.height - this.height - 10,
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  moveUp() {
    this.ySpeed = -this.maxSpeed;
  }

  moveDown() {
    this.ySpeed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  stopY() {
    this.ySpeed = 0;
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

  // TODO: Добавить обработку столкновений с полом и потолком
  update(dt) {
    this.position.x += this.speed;
    this.position.y += this.ySpeed;

    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x + this.width > this.game.width) {
      this.position.x = this.game.width - this.width;
    }
  }

  hit() {
    
  }
}
