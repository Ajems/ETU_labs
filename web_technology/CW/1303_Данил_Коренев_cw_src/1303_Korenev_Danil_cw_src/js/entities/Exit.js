import {spriteManager} from "../manager/spriteManager.js";
import {Bonus} from "./Bonus.js";
import {gameManager} from "../manager/gameManager.js";
import {physicManager} from "../manager/physicManager.js";

export class Exit extends Bonus{
    constructor() {
        super()
        this.name = 'Exit'
        this.type = 0
    }

    update() {
        physicManager.update(this)
    }
    draw(ctx) {
    }
    death() {
    }

    getSpriteName() {
    }
}
