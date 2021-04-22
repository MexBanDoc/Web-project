export class Board {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.width = 200;
        this.height = 20;

        this.maxSpeed = 10;
        this.speed = 0;
        this.ySpeed = 0;

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10
        };
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    moveUp() {
        this.ySpeed = -this.maxSpeed;
    }

    moveDown() {
        this.ySpeed = this.maxSpeed;
    }

    stop() {
        
        this.speed = 0;
    }

    stopY() {
        this.ySpeed = 0;
    }

    updateLocation(dt) {
        this.position.x += this.speed;
        this.position.y += this.ySpeed;

        if (this.position.x < 0) {
            this.position.x = 0;
        }

        if (this.position.x + this.width > this.gameWidth) {
            this.position.x = this.gameWidth - this.width;
        }
    }

    draw(context) {
        context.fillStyle = "#7E1EF5";
        console.log(this.position.x, this.position.y, this.width, this.height)
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
