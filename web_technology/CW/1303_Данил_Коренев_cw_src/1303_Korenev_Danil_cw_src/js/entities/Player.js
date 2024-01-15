import {Entity} from "./Entity.js";
import {spriteManager} from "../manager/spriteManager.js";
import {physicManager} from "../manager/physicManager.js";
import {gameManager} from "../manager/gameManager.js";
import {updateData} from "../main.js";
import {soundManager} from "../manager/soundManager.js";

export class Player extends Entity{
    constructor() {
        super();
        this.width = 16
        this.height = 32
        this.maxLives = 300
        this.lives = 300
        this.money = 0
        this.collisionWidth = 10
        this.collisionheight = 8
        this.move_x = 0
        this.move_y = 0
        this.speed = 2
        this.isFire = false
        this.currentSide = 'front'
        this.currentState = 'stand'
        this.longAnimation = 5
        this.animationIteration = 0
        this.stateIteration = 0
        this.spriteSide = ['front', 'back', 'side_left', 'side_right']
        this.spriteState = ['stand', 'run', 'fire', 'death']
        this.spriteStateDuration = {
            'front_stand': 6,
            'back_stand': 6,
            'side_left_stand': 5,
            'side_right_stand': 5,
            'front_run': 8,
            'back_run': 8,
            'side_left_run': 6,
            'side_right_run': 6,
            'front_fire': 6,
            'back_fire': 6,
            'side_left_fire': 5,
            'side_right_fire': 5,
            'front_death': 13,
            'back_death': 13,
            'side_left_death': 13,
            'side_right_death': 13,
        }
    }
    draw(ctx) {
        spriteManager.drawSprite(ctx, this, this.pos_x, this.pos_y)
    }
    update() {
        if (this.isFire) {
            this.fire()
            this.move_y = 0
            this.move_x = 0
            if (this.currentState !== 'fire') {
                this.stateIteration = 0
                this.animationIteration = 0
            }
        }
        if (this.spriteState === 'death') {
            this.move_y = 0
            this.move_x = 0
        }
        this.changeSide(this.move_x, this.move_y)
        physicManager.update(this)
        updateData(this)
    }

    death(){
        console.log("player death")
        this.currentState = 'death'
        this.stateIteration = 0
        this.animationIteration = 0
        updateData(this)
        gameManager.loseLevel()
    }
    fire() {
        if (this.isFire === false){
            let bulletFire = new gameManager.factory['BulletFire'](this.currentSide)
            if (this.currentSide === 'front'){
                bulletFire.pos_x = this.pos_x+8
                bulletFire.pos_y = this.pos_y+32
            } else if (this.currentSide === 'back'){
                bulletFire.pos_x = this.pos_x+24
                bulletFire.pos_y = this.pos_y
            } else if (this.currentSide === 'side_left'){
                bulletFire.pos_x = this.pos_x
                bulletFire.pos_y = this.pos_y+16
            } else if (this.currentSide === 'side_right'){
                bulletFire.pos_x = this.pos_x+16
                bulletFire.pos_y = this.pos_y+16
            }

                bulletFire.ownerName = this.name
            gameManager.addEntity(bulletFire)
            soundManager.play('/Game/fire.mp3')
        }
        this.isFire = true
    }
    onTouchEntity(obj) {
        if (obj.name.match(/Money[\d]/)) {
            this.money += 50
            obj.death()
        } else if (obj.name.match('Health')) {
            this.lives = Math.min((this.lives+50), this.maxLives)
            obj.death()
        } else if (obj.name === 'Exit'){
            gameManager.finishLevel()
        }
    }

    changeSide(move_x,move_y){
        if (!this.isFire) {
            const curSide = this.currentSide
            if (move_x !== 0 || move_y !== 0){
                if (this.currentState !== 'death') {
                    this.currentState = this.spriteState[1]
                }
            }
            if(move_x === 1){
                this.currentSide = this.spriteSide[3]
            } else if (move_x === -1) {
                this.currentSide = this.spriteSide[2]
            } else if (move_y === 1) {
                this.currentSide = this.spriteSide[0]
            } else if (move_y === -1) {
                this.currentSide = this.spriteSide[1]
            } else {
                if (this.currentState !== 'death') {
                    this.currentState = this.spriteState[0]
                }
            }

            if (curSide !== this.currentSide) {
                this.stateIteration = 0
                this.animationIteration = 0
            } else {
                this.animationIteration ++
                if (this.animationIteration >= this.longAnimation) {
                    this.animationIteration = 0
                    this.stateIteration++
                    if (this.stateIteration >= this.spriteStateDuration[`${this.currentSide}_${this.currentState}`]){
                        this.stateIteration = 0
                    }
                }
            }
        } else {
            if (this.currentState !== this.spriteState[2]) this.currentState = this.spriteState[2]
            this.animationIteration ++
            if (this.animationIteration >= this.longAnimation) {
                this.animationIteration = 0
                this.stateIteration++
                if (this.stateIteration >= this.spriteStateDuration[`${this.currentSide}_${this.currentState}`]){
                    this.stateIteration = 0
                    this.animationIteration = 0
                    this.isFire = false
                    this.currentState = 'stand'
                }
            }
        }

    }

    getSpriteName(bias = 0) {
        if (this.currentState === 'death') return `player_death_${this.stateIteration}`
        return `player_${this.currentSide}_${this.currentState}_${this.stateIteration+Math.max(0, bias)}`
    }

    isInside(x, y) {
        if ((this.pos_x <= x) && (x <= this.pos_x+this.width) && (this.pos_y <= y) && (y <= this.pos_y+this.height)){
            return true
        }
        return false
    }

    getCenter() {
        return [this.pos_x+this.width/2, this.pos_y+this.height/2]
    }

    getCallisonBiasX() {
        return 22
    }

    getCallisonBiasY() {
        return 32
    }
}
