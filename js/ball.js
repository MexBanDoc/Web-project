import { Board } from "./board.js";
import { Brick } from "./brick.js";

export class Ball {
  constructor(game, position = { x: 10, y: 10 }, speed = { x: 3, y: 3 }) {
    this.game = game;
    this.image = game.images["ball"];
    this.radius = 25;
    this.size = this.radius * 2;

    this.speed = speed;
    this.position = position;

    this.lastHit = null;
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
    if (this.position.x + this.size > this.game.width || this.position.x < 0) {
      this.speed.x = -this.speed.x;
      this.lastHit = null;
      return;
    }

    if (this.position.y + this.size > this.game.height || this.position.y < 0) {
      this.speed.y = -this.speed.y;
      this.lastHit = null;
      return;
    }

    for (let obj of this.game.gameObjects) {
      if (this.lastHit == obj) {
        continue;
      }

      if (obj instanceof Brick || obj instanceof Board) {
        if (
          obj.position.x <= this.position.x + this.radius &&
          this.position.x + this.radius <= obj.position.x + obj.width
        ) {
          if (
            obj.position.y + obj.height >= this.position.y &&
            this.position.y + this.size >= obj.position.y
          ) {
            obj.hit();
            this.lastHit = obj;
            this.speed.y = -this.speed.y;
          }
        }

        if (
          this.position.y + this.radius >= obj.position.y &&
          this.position.y + this.radius <= obj.position.y + obj.height
        ) {
          if (
            obj.position.x + obj.width >= this.position.x + this.size &&
            this.position.x + this.radius >= obj.position.x
          ) {
            obj.hit();
            this.lastHit = obj;
            this.speed.x = -this.speed.x;
          }
        }
      }
    }
  }
}
