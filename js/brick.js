export class Brick {
  constructor(game, position = { x: 0, y: 0 }) {
    this.game = game;
    this.image = game.images["brick"];
    this.width = game.settingManager.brickWidth;
    this.height = game.settingManager.brickHeight;

    this.position = position;
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

  update(dt) {}

  hit() {
    var index = this.game.gameObjects.indexOf(this);
    if (index !== -1) {
      this.game.gameObjects.splice(index, 1);
    }
  }
}
