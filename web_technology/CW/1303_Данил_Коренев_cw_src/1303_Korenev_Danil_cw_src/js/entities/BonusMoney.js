import {spriteManager} from "../manager/spriteManager.js";
import {Bonus} from "./Bonus.js";
import {gameManager} from "../manager/gameManager.js";

export class BonusMoney extends Bonus{
    constructor() {
        super()
        this.name = 'bonus_money'
        this.number = Math.floor(Math.random() * 8) + 1;
        this.type = 0
    }
    draw(ctx) {
        spriteManager.drawSprite(ctx, this, this.pos_x, this.pos_y)
    }
    death() {
        gameManager.removeEntity(this)
    }

    getSpriteName() {
        super.getSpriteName();
        return `bonus_money_${this.number}`
    }
}
