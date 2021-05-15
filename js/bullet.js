import { Board } from "./board.js";
import { Brick } from "./brick.js";

export class Bullet {
  constructor(
    game,
    position = { x: 10, y: 10 },
    speed = { x: 0, y: -10 },
    radius = 25
  ) {
    this.game = game;
    this.image = game.images["ball2"];
    this.radius = radius;
    this.size = this.radius * 2;

    this.speed = speed;
    this.position = position;

    this.lastHit = null;
    this.bounceable = true;
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

    this.handleCollisions();
  }

  handleCollisions() {
    if (this.position.y < 0) {
      this.game.removeObject(this);
    }

    for (let obj of this.game.gameObjects) {
      if (this.lastHit == obj) {
        continue;
      }

      if (obj instanceof Brick) {
        if (
          obj.position.x <= this.position.x + this.radius &&
          this.position.x + this.radius <= obj.position.x + obj.width
        ) {
          if (
            obj.position.y + obj.height >= this.position.y &&
            this.position.y + this.size >= obj.position.y
          ) {
            obj.hit();
            this.game.removeObject(this);
          }
        }
      }
    }
  }
}
