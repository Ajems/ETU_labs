import {eventManager} from "./eventManager.js";
import {mapManager} from "./mapManager.js";
import {spriteManager} from "./spriteManager.js";
import {Player} from "../entities/Player.js";
import {Enemy} from "../entities/Enemy.js";
import {BonusMoney} from "../entities/BonusMoney.js";
import {BonusHealth} from "../entities/BonusHealth.js";
import {BulletFire} from "../entities/BulletFire.js";
import {Exit} from "../entities/Exit.js";
import {gameOver, nextLevel} from "../main.js";
import {storageManager} from "./storageManager.js";

class GameManager {
    constructor() {
        this.factory = {}
        this.entities = []
        this.player = null
        this.laterKill = []
        this.interval = null
        this.playerName = null
        this.level = null
    }

    setPlayerName(playerName) {
        this.playerName = playerName
    }

    setLevel(level){
        this.level = level
    }


    initPlayer(obj) {
        this.player = obj
    }

    update() {
        if (this.player === null) {
            return
        }
        this.player.move_x = 0
        this.player.move_y = 0

        if (eventManager.action['up']) this.player.move_y = -1
        if (eventManager.action['down']) this.player.move_y = 1
        if (eventManager.action['left']) this.player.move_x = -1
        if (eventManager.action['right']) this.player.move_x = 1
        if (eventManager.action['fire']) this.player.fire()

        this.entities.forEach((e) => {
            try {
                e.update()
            } catch (ex) {}
        })

        for (let i = 0; i < this.laterKill.length; i++) {
            let idx = this.entities.indexOf(this.laterKill[i])
            if (idx > -1) {
                this.entities.splice(idx, 1)
            }
        }

        if (this.laterKill.length > 0) {
            this.laterKill.length = 0
        }

        mapManager.draw(ctx)
        this.draw(ctx)
        if (this.player !== null) {
            mapManager.drawOnPlayer(ctx)
            mapManager.centerAt(this.player.pos_x, this.player.pos_y)
        }
    }
    draw(ctx) {
        for (let e = 0; e < this.entities.length; e++) {
            this.entities[e].draw(ctx)
        }
    }
    loadAll(level) {
        if (level === 1) {
            mapManager.loadMap('../../map.json')
            spriteManager.loadAtlas({
                '../../spritesPlayer.json': '../../spritesPlayer.png',
                '../../spritesBonusMoney.json': '../../spritesBonusMoney.png',
                '../../spritesCactus.json': '../../spritesCactus.png',
                '../../spritesBonus2.json': '../../spritesBonus2.png',
                '../../spritesPlayerDeath.json': '../../spritesPlayerDeath.png',
            })
            gameManager.factory['Player'] = Player
            gameManager.factory['Enemy'] = Enemy
            gameManager.factory['Money'] = BonusMoney
            gameManager.factory['Health'] = BonusHealth
            gameManager.factory['BulletFire'] = BulletFire
            gameManager.factory['Exit'] = Exit
        } else if (level === 2){
            mapManager.loadMap('../../map2.json')
            spriteManager.loadAtlas({
                '../../spritesPlayer.json': '../../spritesPlayer.png',
                '../../spritesBonusMoney.json': '../../spritesBonusMoney.png',
                '../../spritesCactus.json': '../../spritesCactus.png',
                '../../spritesBonus2.json': '../../spritesBonus2.png',
                '../../spritesPlayerDeath.json': '../../spritesPlayerDeath.png',
            })
            gameManager.factory['Player'] = Player
            gameManager.factory['Enemy'] = Enemy
            gameManager.factory['Money'] = BonusMoney
            gameManager.factory['Health'] = BonusHealth
            gameManager.factory['BulletFire'] = BulletFire
            gameManager.factory['Exit'] = Exit
        }
        mapManager.parseEntities()
        mapManager.draw(ctx)
        eventManager.setup(canvas)
    }
    play() {
        this.interval = setInterval( () => {this.updateWorld()}, 15)
    }

    finishLevel(){
        this.clearManager()
        nextLevel()
    }

    loseLevel() {
        this.clearManager()
        gameOver()
    }

    clearManager() {
        clearInterval(this.interval)
        storageManager.addNewResult({player: this.playerName, score: this.player.money}, this.level)
        this.factory = {}
        this.entities = []
        this.player = null
        this.laterKill = []
        this.interval = null
        mapManager.finish()
    }

    updateWorld(){
        this.update()
    }

    addEntity(obj){
        this.entities.push(obj)
    }

    removeEntity(obj) {
        const index = this.entities.indexOf(obj);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }
}

export const gameManager = new GameManager()