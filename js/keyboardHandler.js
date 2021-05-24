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
      case "w":
        this.board.moveUp();
        break;
      case "s":
        this.board.moveDown();
        break;
      case "a":
        this.board.moveLeft();
        break;
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
      case "w":
        this.board.stopMovingUp();
        break;
      case "s":
        this.board.stopMovingDown();
        break;
      case "a":
        this.board.stopMovingLeft();
        break;
      case "d":
        this.board.stopMovingRight();
        break;
      case " ":
        this.board.stopBonus();
        break;
    }
  }
}
