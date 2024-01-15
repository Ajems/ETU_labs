import {mapManager} from "./mapManager.js";
import {gameManager} from "./gameManager.js";

class PhysicManager {
    constructor() {  }

    update(obj) {
        if (obj.move_x === 0 && obj.move_y === 0) {
            return 'stop'
        }
        let newX = obj.pos_x + Math.floor(obj.move_x * obj.speed)
        let newY = obj.pos_y + Math.floor(obj.move_y * obj.speed)

        if (obj.name === 'BulletFire') {
            let e = this.entityBulletAtXY(obj, newX, newY)
            if (e !== null && obj.onTouchEntity) {
                obj.onTouchEntity(e)
            }
        } else if (obj.name === 'Player') {
            let b = this.entityBonusAtXY(obj, newX, newY)
            if (b !==null && obj.onTouchEntity) {
                obj.onTouchEntity(b)
            }
            let exit = this.entityExitAtXY(obj, newX, newY)
            if (exit !== null && obj.onTouchEntity){
                obj.onTouchEntity(exit)
            }
        }

        if ((0 <= newX+16) && (newX+32 <= mapManager.w) && !mapManager.isCollision(newX + obj.getCallisonBiasX(), obj.pos_y + obj.getCallisonBiasY(), obj)) {
            obj.pos_x = newX
        } else {
            if (obj.name === "BulletFire") {
                obj.death()
            }
        }
        if ((-40 <= newY) && (newY+40 <= mapManager.h) && !mapManager.isCollision(obj.pos_x + obj.getCallisonBiasX(), newY + obj.getCallisonBiasY(), obj)) {
            obj.pos_y = newY
        } else {
            if (obj.name === "BulletFire") {
                obj.death()
            }
        }

        return 'move'
    }

    entityBulletAtXY(obj, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            let e = gameManager.entities[i]
            if (e.name !== obj.name) {
                if (e.isInside(x, y)) {
                    return e
                }
            }
        }
        return null
    }

    entityBonusAtXY(obj, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            let e = gameManager.entities[i]
            if (e.name !== obj.name && (e.name.match('Health') || e.name.match(/Money[\d]/))) {
                const obj_x = x + Math.floor(obj.size_x/2)
                const obj_y = y + Math.floor(obj.size_y/2)

                if ((e.pos_x-16 <= obj_x) && (obj_x <= (e.pos_x+e.size_x-16)) && (e.pos_y-16 <= obj_y) && (obj_y <= (e.pos_y+e.size_y-16))) {
                    return e
                }
            }
        }
        return null
    }

    entityExitAtXY(obj, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            let e = gameManager.entities[i]
            if (e.name !== obj.name && e.name.match('Exit')) {
                const obj_x = x + Math.floor(obj.size_x/2)
                const obj_y = y + Math.floor(obj.size_y/2)

                if ((e.pos_x-16 <= obj_x) && (obj_x <= (e.pos_x+e.size_x-16)) && (e.pos_y-16 <= obj_y) && (obj_y <= (e.pos_y+e.size_y-16))) {
                    return e
                }
            }
        }
        return null
    }
}

export const physicManager = new PhysicManager()