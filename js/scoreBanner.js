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

    this.startTime = new Date().getTime();
    this.timerInterval;
    this.minutes = 0;
    this.seconds = 0;

    this.clockIndex = 0;
    this.timeStr = "00:00";
  }

  startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.startTime = new Date().getTime();
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1000);
  }

  updateTimer() {
    let now = new Date().getTime();
    let before = this.startTime;
    let spent = now - before;
    this.minutes = Math.floor((spent % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((spent % (1000 * 60)) / 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = null;
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
      this.position.x + this.height * 12.8,
      this.position.y + this.height - 10
    );

    context.fillText(
      this.timeStr,
      this.position.x + this.height * 14,
      this.position.y + this.height - 10
    );
  }

  update(dt) {
    this.clockIndex = Math.floor(this.seconds / 5) % this.clocks.length;
    this.timeStr =
      this.minutes.toString().padStart(2, "0") +
      ":" +
      this.seconds.toString().padStart(2, "0");
  }
}
