export class KeyboardHandler {
  constructor(board) {
    this.board = board;
    this.keyDown = this.keyDownHandler.bind(this);
    this.keyUp = this.keyUpHandler.bind(this);
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }

  dispose() {
    document.removeEventListener("keydown", this.keyDown);
    document.removeEventListener("keyup", this.keyUp);
  }

  keyDownHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "ц":
      case "w":
        this.board.moveUp();
        break;
      case "ArrowDown":
      case "ы":
      case "s":
        this.board.moveDown();
        break;
      case "ArrowLeft":
      case "ф":
      case "a":
        this.board.moveLeft();
        break;
      case "ArrowRight":
      case "в":
      case "d":
        this.board.moveRight();
        break;
      case " ":
        if (this.board.game.state === "Idle") {
          this.board.game.continue();
        }
        this.board.useBonus();
        break;
    }
  }

  keyUpHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "ц":
      case "w":
        this.board.stopMovingUp();
        break;
      case "ArrowDown":
      case "ы":
      case "s":
        this.board.stopMovingDown();
        break;
      case "ArrowLeft":
      case "ф":
      case "a":
        this.board.stopMovingLeft();
        break;
      case "ArrowRight":
      case "в":
      case "d":
        this.board.stopMovingRight();
        break;
      case " ":
        this.board.stopBonus();
        break;
    }
  }
}
