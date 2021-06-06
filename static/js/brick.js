import { generateBonus } from "./bonus.js";

export class Brick {
  constructor(game, position = { x: 0, y: 0 }, indestructible = false) {
    this.game = game;
    this.indestructible = indestructible;
    this.image = indestructible ? game.images["shieldy"] : game.images["brick"];
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
    this.game.audioManager.audios['brickDestroyed'].play();
    if (this.indestructible) return;
    this.game.removeObject(this);
    this.game.changeScore(1);
    let chance = Math.random() < this.game.settingManager.bonusChance;
    if (chance && this.meta!="shield") {
      this.game.audioManager.audios['bonusFall'].play();
      generateBonus(this.game, this.position);
    }
  }
}
