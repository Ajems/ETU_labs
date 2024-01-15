import {Playground} from "./Playground.js";
import {FigureGenerator} from "./FigureGenerator.js";
import {MoveDown} from "./objects/Move.js";
import {ColorConverter} from "./objects/ColorConverter.js";
import {Result} from "./objects/Result.js";

export class Looper{

    color = new ColorConverter()
    intervalId = null
    storage = null
    constructor(stopGame, config, storage, controller) {
        this.stopGame = stopGame
        this.config = config
        this.storage = storage
        this.controller = controller

        this.playground = new Playground(this)
        this.figureGenerator = new FigureGenerator()
        this.controller.setPlayground(this.playground)

        let levelDocument = document.getElementById('level')
        levelDocument.textContent = this.formatLevel(this.config.level.timeSpeed)
    }

    setTimeSpeed() {
        return Math.round(1000 / this.config.level.timeSpeed)
    }

    initGame () {
        this.canvas = document.getElementById('game')
        this.contextCanvas = this.canvas.getContext('2d')
        this.scoreDocument = document.getElementById('score')
        this.playerDocument = document.getElementById('current_player')
        this.playerDocument.textContent = this.formatPlayer(this.config.username)

        this.restartGameButton = document.getElementById('button_restart')
        this.restartGameButton.addEventListener("click", () => {this.restartGame()})

        this.mainMenuButton = document.getElementById('button_main_menu')
        this.mainMenuButton.addEventListener('click', () => {this.mainMenu()})

        this.controller.listen(this)

        this.setRandomFigure()
        this.startGame(this.setTimeSpeed())
    }

    setRandomFigure() {
        let figure = this.figureGenerator.getNext()
        return this.playground.setFigure(
            figure,
            Math.floor((this.playground.width-figure.width)/2)
        )
    }

    generateFigure(){
        let resultGenerateFigure = this.setRandomFigure()
        if (resultGenerateFigure === false){
            this.finishGame()
        }
    }

    startGame(time){
        const gameOverOverlay = document.getElementById('gameOverOverlay')
        gameOverOverlay.style.display = 'none'
        this.intervalId = setInterval(() => {
            if (this.playground.figure === null){ //фигура отсутсвует -> сгенерировать новую
                this.generateFigure()
            } else {
                this.playground.moveFigure(MoveDown)
            }
            this.updateView()
            console.log(this.setTimeSpeed())
        }, time)
    }

    restartGame(){
        clearInterval(this.intervalId)
        this.config.level.setDefault()
        this.playground.restart()
        this.updateView()
        this.startGame(this.setTimeSpeed())
    }

    mainMenu() {
        clearInterval(this.intervalId)
        window.location.replace('https://localhost/')
    }

    increaseLevel(){
        this.config.level.timeSpeed+=1
        let levelDocument = document.getElementById('level')
        levelDocument.textContent = this.formatLevel(this.config.level.timeSpeed)
        clearInterval(this.intervalId)
        this.startGame(this.setTimeSpeed())
    }

    finishGame() {
        const gameOverOverlay = document.getElementById('gameOverOverlay')
        gameOverOverlay.style.display = 'flex'

        clearInterval(this.intervalId)
        let result = new Result(this.playground.score, this.config.username, this.config.level)
        this.storage.addNewResult(result)
        this.stopGame()
    }

    updateView() {
        this.grid = 32
        let view = this.playground.getView();
        this.contextCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let row = 0; row < this.playground.height; row++){
            for (let column = 0; column < this.playground.width; column++){
                if (view[row][column] !== 0) {
                    this.contextCanvas.fillStyle = this.color.color[view[row][column]]
                    this.contextCanvas.fillRect(column * this.grid, row * this.grid, this.grid - 1, this.grid - 1);
                }
            }
        }
        this.scoreDocument.textContent = this.formatScore(this.playground.score)
    }

    formatScore(score) {
        return `Score: ${score}`
    }

    formatLevel(level) {
        return `Level: ${level}`
    }

    formatPlayer(player){
        if (player.length > 13) {
            return `Player: ${player.slice(0, 10)}...`
        } else {
            return `Player: ${player}`
        }
    }
}