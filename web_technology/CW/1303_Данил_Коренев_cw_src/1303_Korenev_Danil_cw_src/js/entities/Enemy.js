import {Entity} from "./Entity.js";
import {spriteManager} from "../manager/spriteManager.js";
import {physicManager} from "../manager/physicManager.js";
import {gameManager} from "../manager/gameManager.js";
import {mapManager} from "../manager/mapManager.js";
import {soundManager} from "../manager/soundManager.js";

export class Enemy extends Entity{
    constructor() {
        super();
        this.isFire = false
        this.lifetime = 100
        this.width = 40
        this.height = 40
        this.name = 'Enemy'
        this.collisionWidth = 8
        this.collisionheight = 8
        this.move_x = 0
        this.move_y = 0
        this.size_x = 40
        this.size_y = 40
        this.speed = 2
        this.currentSide = 'front'
        this.currentState = 'stand'
        this.longAnimation = 5
        this.animationIteration = 0
        this.stateIteration = 0
        this.spriteSide = ['front', 'back', 'side_left', 'side_right']
        this.spriteState = ['stand', 'walk', 'fire', 'death']
        this.spriteStateDuration = {
            'front_stand': 4,
            'back_stand': 4,
            'side_left_stand': 4,
            'side_right_stand': 4,
            'front_walk': 10,
            'back_walk': 10,
            'side_left_walk': 8,
            'side_right_walk': 8,
            'front_fire': 10,
            'back_fire': 10,
            'side_left_fire': 10,
            'side_right_fire': 10,
            'death': 0
        }
    }

    draw() {
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

        const playerPosX = gameManager.player.pos_x
        const playerPosY = gameManager.player.pos_y
        if ((Math.abs(playerPosX-this.pos_x)**2+Math.abs(playerPosY-this.move_y)**2)**(1/2) && !this.currentState !== 'fire'){
            const path = this.playerPathSearch()
            if (path !== null && 0 <= path.length && path.length <= 20) {
                if (this.isStraightLine(path) && path.length <=10) {
                    this.move_x = 0
                    this.move_y = 0
                    this.fire()
                } else {
                    const cordEnemy = mapManager.getCord(
                        this.pos_x + this.getCallisonBiasX(),
                        this.pos_y + this.getCallisonBiasY(),
                        this
                    )
                    const enemyCordX = cordEnemy[0]
                    const enemyCordY = cordEnemy[1]

                    if (path.length > 0) {
                        const firstStep = path[0];
                        this.move_x = Math.sign(firstStep.x - enemyCordX); // -1, 0, or 1
                        this.move_y = Math.sign(firstStep.y - enemyCordY); // -1, 0, or 1
                    }
                }
            } else {
                this.move_x = 0
                this.move_y = 0
            }
        }
        this.changeSide(this.move_x, this.move_y)
        physicManager.update(this)
    }

    isStraightLine(path) {
        if (path.length < 2) {
            return true;
        }

        const firstStep = path[0];
        const isVerticalLine = path.every(step => step.x === firstStep.x);
        const isHorizontalLine = path.every(step => step.y === firstStep.y);

        return isVerticalLine || isHorizontalLine;
    }

    playerPathSearch() {
        const map = mapManager.callision
        const playerPosX = gameManager.player.pos_x
        const playerPosY = gameManager.player.pos_y
        const cordPlayer = mapManager.getCord(
            playerPosX + gameManager.player.getCallisonBiasX(),
            playerPosY + gameManager.player.getCallisonBiasY(),
            gameManager.player
        )
        const playerCordX = cordPlayer[0]
        const playerCordY = cordPlayer[1]

        const cordEnemy = mapManager.getCord(
            this.pos_x + this.getCallisonBiasX(),
            this.pos_y + this.getCallisonBiasY(),
            this
        )
        const enemyCordX = cordEnemy[0]
        const enemyCordY = cordEnemy[1]

        const heuristic = (x, y) => Math.abs(x - playerCordX) + Math.abs(y - playerCordY);
        const openSet = [{ x: enemyCordX, y: enemyCordY, f: heuristic(enemyCordX, enemyCordY), g: 0, path: [] }];
        const closedSet = new Set();
        while (openSet.length > 0) {
            openSet.sort((a, b) => a.f - b.f);
            const current = openSet.shift();
            if (current.x === playerCordX && current.y === playerCordY) {
                return current.path;
            }
            if (current.path.length >= 20) {
                return null;
            }
            const neighbors = [
                { x: current.x + 1, y: current.y },
                { x: current.x - 1, y: current.y },
                { x: current.x, y: current.y + 1 },
                { x: current.x, y: current.y - 1 },
            ];
            for (const neighbor of neighbors) {
                const { x: nx, y: ny } = neighbor;
                if (
                    nx >= 0 &&
                    nx < map[0].length &&
                    ny >= 0 &&
                    ny < map.length &&
                    map[ny][nx] === 0 &&
                    !closedSet.has(`${ny}-${nx}`)
                ) {
                    const g = current.g + 1;
                    const h = heuristic(nx, ny);
                    const f = g + h;
                    const existingIndex = openSet.findIndex((node) => node.x === nx && node.y === ny);

                    if (existingIndex !== -1 && g >= openSet[existingIndex].g) {
                        continue;
                    }
                    const newPath = [...current.path, neighbor];
                    if (existingIndex !== -1) {
                        openSet.splice(existingIndex, 1);
                    }
                    openSet.push({ x: nx, y: ny, f, g, path: newPath });
                }
            }
            closedSet.add(`${current.y}-${current.x}`);
        }
        return null;
    }

    onTouchEntity(obj) {
        super.onTouchEntity(obj);
    }

    changeSide(move_x,move_y){
        if (!this.isFire) {
            const curSide = this.currentSide
            if (move_x !== 0 || move_y !== 0){
                this.currentState = this.spriteState[1]
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
                this.currentState = this.spriteState[0]
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

                let bulletFire = new gameManager.factory['BulletFire'](this.currentSide)
                bulletFire.pos_x = this.pos_x+16
                bulletFire.pos_y = this.pos_y+16
                bulletFire.ownerName = this.name
                if (this.stateIteration === 7 && this.animationIteration === 0){
                    soundManager.play('/Game/fire.mp3')
                    gameManager.addEntity(bulletFire)
                }

                if (this.stateIteration >= this.spriteStateDuration[`${this.currentSide}_fire`]){
                    this.stateIteration = 0
                    this.animationIteration = 0
                    this.isFire = false
                    this.currentState = 'stand'
                }
            }
        }

    }
    death(){
        console.log(`Enemy ${this.name} death`)
        gameManager.removeEntity(this)
    }
    fire() {
        if (this.isFire === false){
            this.stateIteration = 0
            this.animationIteration = 0

            const playerPosX = gameManager.player.pos_x
            const playerPosY = gameManager.player.pos_y

            if (Math.abs(this.pos_x - playerPosX) > Math.abs(this.pos_y - playerPosY)) {
                if (this.pos_x < playerPosX) {
                    this.currentSide = this.spriteSide[3]
                } else if (this.pos_x > playerPosX) {
                    this.currentSide = this.spriteSide[2]
                }
            } else {
                if (this.pos_y < playerPosY) {
                    this.currentSide = this.spriteSide[0]
                } else if (this.pos_y > playerPosY) {
                    this.currentSide = this.spriteSide[1]
                }
            }
        }
        this.isFire = true
    }
    getSpriteName(bias = 0) {
        // console.log(`cactus_${this.currentSide}_${this.currentState}_${this.stateIteration}`)
        return `cactus_${this.currentSide}_${this.currentState}_${this.stateIteration+bias}`
    }

    isInside(x, y) {
        if ((this.pos_x+10 <= x) && (x <= this.pos_x+this.width-10) && (this.pos_y+6 <= y) && (y <= this.pos_y+this.height-6)){
            return true
        }
        return false
    }

    getCenter() {
        return [this.pos_x+this.width/2, this.pos_y+this.height/2]
    }

    getCallisonBiasX() {
        return 20
    }

    getCallisonBiasY() {
        return 34
    }
}
