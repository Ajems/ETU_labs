import {spriteManager} from "../manager/spriteManager.js";
import {Entity} from "./Entity.js";

export class Bonus extends Entity{
    constructor() {
        super()
        this.width = 16
        this.height = 16
    }
    draw(ctx) {
        spriteManager.drawSprite(ctx, this, this.pos_x, this.pos_y)
    }
    death() {

    }

    getSpriteName() {
        super.getSpriteName();
    }

    getCenter() {
        return [this.pos_x+this.width/2, this.pos_y+this.height/2]
    }
}
