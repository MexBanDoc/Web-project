export class Ball {
  constructor(game) {
    this.game = game;
    this.image = game.ballImage;
    this.size = 50;

    this.speed = { x: 3, y: 3 };
    this.position = { x: 10, y: 10 };
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(dt) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x + this.size > this.game.width || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y + this.size > this.game.height || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
  }
}
