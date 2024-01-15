import {gameManager} from "../manager/gameManager.js";
import {spriteManager} from "../manager/spriteManager.js";
import {physicManager} from "../manager/physicManager.js";
import {soundManager} from "../manager/soundManager.js";

export class BulletFire {
    constructor(direction) {
        this.name = "BulletFire"
        this.ownerName = ""
        this.pos_x = 0
        this.pos_y = 0
        this.size_x = 16
        this.size_y = 16
        this.collisionWidth = 4
        this.collisionheight = 4
        this.move_y = 0
        this.move_x = 0
        this.currentDir = direction
        this.speed = 10
    }
    onTouchEntity(obj) {
        if (obj.name === this.ownerName) {
            return
        }
        if (obj.name.match(/Enemy[\d]/)) {
            if (obj.name === this.ownerName) {
                return
            }
            obj.death()
            this.death()
        } else if (obj.name.match("Player")){
            obj.lives -= 50
            console.log(obj.lives)
            if (obj.lives <= 0){
                obj.death()
            }
            this.death()
        }
    }

    death() {
        gameManager.removeEntity(this)
    }

    update() {
        if (this.currentDir === 'front'){
            this.move_y = 1
        } else if (this.currentDir === 'back'){
            this.move_y = -1
        } else if (this.currentDir === 'side_left'){
            this.move_x = -1
        } else if (this.currentDir === 'side_right'){
            this.move_x = 1
        }
        physicManager.update(this)
    }

    getSpriteName() {
        return `bullet_fire_${this.currentDir}`
    }

    draw(){
        spriteManager.drawSprite(ctx, this, this.pos_x, this.pos_y)
    }
    getCenter() {
        return [this.pos_x+this.size_x/2, this.pos_y+this.size_y/2]
    }

    getCallisonBiasX() {
        return 8
    }

    getCallisonBiasY() {
        return 8
    }
}
