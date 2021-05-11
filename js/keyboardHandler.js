export class KeyboardHandler {
  constructor(board) {
    this.board = board;
    this.keyDown = this.keyDownHandler.bind(this);
    this.keyUp = this.keyUpHandler.bind(this);
    document.addEventListener("keydown", this.keyDown);

    // FIXME: Доска останавливается, если быстро нажать в обе стороны
    // TODO: Вместо полного обнуления, отменять скоростьв нужном направлении
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
        this.board.useBonus();
        break;
    }
  }

  keyUpHandler(event) {
    switch (event.key) {
      case "w":
      case "s":
        this.board.stopY();
        break;
      case "a":
        if (this.board.speed < 0) {
          this.board.stop();
        }
        break;
      case "d":
        if (this.board.speed > 0) {
          this.board.stop();
        }
        break;
      case " ":
        this.board.stopBonus();
        break;
    }
  }
}
