import { Brick } from "./brick.js";
import { Bullet } from "./bullet.js";

let bonusMap = {
    confuse: {
        activate(game){
            game.board.baseSpeed = -game.board.baseSpeed;
            return true;          //one time(f) or permanent(t)
        },
        deactivate(game){
            game.board.baseSpeed = -game.board.baseSpeed;
        },
    },
    shrink: {
        activate(game){
            game.board.width = game.board.width / 2;
            return true;
        },
        deactivate(game){
            game.board.width = game.board.width * 2;
        },
    },
    explode: {
        activate(game){
            game.ball.image = game.images["ballCrit"];
            game.ball.bounceable = false;
            return true;
        },
        deactivate(game){
            game.ball.image = game.images["ball"];
            game.ball.bounceable = true;
        },
    },
    jolt: {
        activate(game){
            game.ball.speed.x = game.ball.speed.x * 1.3;
            game.ball.speed.y = game.ball.speed.y * 1.3;
            return true;
        },
        deactivate(game){
            game.ball.speed.x = game.ball.speed.x / 1.3;
            game.ball.speed.y = game.ball.speed.y / 1.3;
        },
    },
    diam: {
        activate(game){
            game.audioManager.tryPlay('diamСaught');
            game.changeScore(game.scoreChunk);
            return false;
        },
        deactivate(game){
        },
    },
    shield: {
        activate(game){
            let shield = new Brick(game, { x: 0, y: game.height - 10 });
            shield.height = 10;
            shield.width = game.width;
            shield.meta = "shield";
            game.addObject(shield);
            return false;
        },
        deactivate(game){

        },
    },
    range: {
        left: 3,
        activate(game){
            game.audioManager.tryPlay('range');
            let radius = 25;
            let bullet1 = new Bullet(
                game,
                { x: game.board.position.x, y: game.board.position.y },
                { x: 0, y: -10 },
                radius
            );
            let bullet2 = new Bullet(
                game,
                {
                    x: game.board.position.x + game.board.width - radius * 2,
                    y: game.board.position.y,
                },
                { x: 0, y: -10 },
                radius
            );
            game.addObject(bullet1);
            game.addObject(bullet2);

            this.left--;
            if (this.left < 0) {
                return false;
            }
            return true;
        },
        deactivate(game){
        },
        interactive: true,
    },
}

let bonuses = Object.keys(bonusMap);

export function generateBonus(game, position = { x: 0, y: 0 }) {
    var bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
    let bonusBox = new BonusBox(game, bonus, position);
    game.addObject(bonusBox);
}

export class BonusBox {
    constructor(game, type = "confuse", position = { x: 0, y: 0 }) {
        this.game = game;
        this.type = type;
        // this.bonus = bonusMap[type];
        this.bonus = Object.assign({}, bonusMap[type]);
        this.image = game.images["bonus-" + type];
        this.width = game.settingManager.bonusWidth;
        this.height = game.settingManager.bonusHeight;

        this.position = position;
        this.speed = { x: 0, y: 3 };
    }

    activate(game) {
        if (this.bonus.interactive){
            game.bonuses.add(this.bonus);
            return;
        }
        if (this.bonus.activate(game)){
            game.bonuses.add(this.bonus);
        }
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

    update(dt) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        this.handleCollisions();
    }

    handleCollisions() {
        if (this.position.y + this.size > this.game.height) {
            this.hit();
            return;
        }

        let obj = this.game.board;

        if (
            obj.position.x <= this.position.x + this.width / 2 &&
            this.position.x + this.width / 2 <= obj.position.x + obj.width
        ) {
            if (
                obj.position.y + obj.height >= this.position.y &&
                this.position.y + this.height >= obj.position.y
            ) {
                obj.hit();
                this.hit();
                this.activate(this.game);
            }
        }
    }

    hit() {
        this.game.removeObject(this);
    }
}