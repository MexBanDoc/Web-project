import { Board } from "./board.js";
import { Brick } from "./brick.js";

export class Ball {
  constructor(
    game,
    position = { x: 10, y: 10 },
    speed = { x: 3, y: 3 },
    radius = 25
  ) {
    this.game = game;
    this.image = game.images["ball"];
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
    if (this.position.x + this.size > this.game.width && this.lastHit!="right"){
      this.speed.x = -this.speed.x;
      this.lastHit = "right"
    }

    if (this.position.x < 0 && this.lastHit != "left"){
      this.speed.x = -this.speed.x;
      this.lastHit = "left";
    }

    //top
    if (this.position.y < 0 && this.lastHit != "top") {
      this.speed.y = -this.speed.y;
      this.lastHit = "top";
    }

    //bottom
    if (this.position.y + this.size > this.game.height) {
      this.lastHit = null;
      this.game.state = "Fail";
      this.game.looseBall();
    }

    for (let obj of this.game.gameObjects) {
      if (this.lastHit === obj) {
        continue;
      }

      if (obj instanceof Brick || obj instanceof Board) {
        if (
          obj.position.x <= this.position.x + this.size &&
          this.position.x <= obj.position.x + obj.width
        ) {
          if (
            obj.position.y + obj.height >= this.position.y &&
            this.position.y + this.size >= obj.position.y
          ) {
            obj.hit();
            this.lastHit = obj;
            if (!(obj instanceof Board)) {
              if (this.bounceable || obj.indestructible) {
                let ball_r = this.position.x + this.size;
                let ball_l = this.position;
                let obj_l = obj.position.x;
                let obj_r = obj.position+obj.width;
                let ball_t = this.position.y;
                let ball_b = this.position.y + this.size;
                let obj_t = obj.position.y;
                let obj_b = obj.position.y + obj.height;
                let x_inter = Math.min(ball_r, obj_r) - Math.max(ball_l, obj_l)
                let y_inter = Math.min(ball_b, obj_b) - Math.max(ball_t, obj_t)
                if (x_inter < y_inter){
                  this.speed.x = - this.speed.x;
                }
                else{
                  this.speed.y = -this.speed.y;
                }
              }
            } else {
              let a = Math.atan2(this.speed.y, this.speed.x);
              let horizontalDelta =
                (obj.position.x +
                  obj.width / 2 -
                  (this.position.x + this.radius)) /
                obj.width;
              let newA = a + horizontalDelta;
              newA = Math.min(newA, Math.PI * 0.85);
              newA = Math.max(newA, -Math.PI * 0.85);
              let len = Math.sqrt(
                this.speed.y * this.speed.y + this.speed.x * this.speed.x
              );
              this.speed.y = -len * Math.sin(newA);
              this.speed.x = len * Math.cos(newA);
            }
          }
        }

        if (
          this.position.y + this.radius >= obj.position.y &&
          this.position.y + this.radius <= obj.position.y + obj.height
          //   this.position.y + this.size >= obj.position.y &&
          //   this.position.y + this.radius <= obj.position.y + obj.height
        ) {
          if (
            obj.position.x + obj.width >= this.position.x &&
            this.position.x + this.size >= obj.position.x
          ) {
            obj.hit();
            this.lastHit = obj;
            if (!(obj instanceof Board) && !this.bounceable) {
              continue;
            }
            this.speed.x = -this.speed.x;
          }
        }
      }
    }
  }
}
