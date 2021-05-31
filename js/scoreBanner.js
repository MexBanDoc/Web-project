export class ScoreBanner {
  constructor(game, position = { x: 0, y: 0 }, height) {
    this.game = game;
    this.position = position;
    this.height = height;
    this.scoreImage = game.images["diam"];
    this.healthImage = game.images["heart"];
    this.clocks = [
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚",
      "🕛",
    ];
    this.clockIndex = 0;
    this.dtCounter = 0;
  }

  draw(context) {
    context.fillStyle = "rgba(255, 11, 61, 1)";
    context.fillRect(0, this.height, this.width, this.height);

    context.drawImage(
      this.scoreImage,
      this.position.x,
      this.position.y,
      this.height,
      this.height
    );

    context.fillStyle = "white";
    context.font = "48px serif";
    context.fillText(
      this.game.score,
      this.position.x + this.height,
      this.position.y + this.height - 10
    );

    context.drawImage(
      this.healthImage,
      this.position.x + this.height * 3,
      this.position.y,
      this.height,
      this.height
    );

    context.fillText(
      this.game.lives,
      this.position.x + this.height * 4,
      this.position.y + this.height - 10
    );

    context.font = "42px serif";
    context.fillText(
      this.clocks[this.clockIndex],
      this.position.x + this.height * 14.5,
      this.position.y + this.height - 10
    );
  }

  update(dt) {
    this.dtCounter += 1;
    if (this.dtCounter % 50 === 0) {
      this.clockIndex = (this.clockIndex + 1) % this.clocks.length;
    }
  }
}
