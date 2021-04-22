export class KeyboardHandler {
    constructor(board) {
        this.board = board;
        document.addEventListener("keydown", event => {
            switch(event.key) {
                case 'w':
                    board.moveUp();
                    break;
                case 's':
                    board.moveDown();
                    break;
                case 'a':
                    board.moveLeft();
                    break;
                case 'd':
                    board.moveRight();
                    break;
            }
        });

        document.addEventListener("keyup", event => {
            switch(event.key) {
                case 'w':
                case 's':
                    board.stopY();
                    break;
                case 'a':
                case 'd':
                    board.stop();
                    break;
            }
        });
    }
}