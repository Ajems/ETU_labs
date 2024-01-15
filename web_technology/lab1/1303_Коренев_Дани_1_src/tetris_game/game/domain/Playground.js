import {MoveDown, MoveDrop, MoveLeft, MoveRight, MoveRotate} from "./objects/Move.js";
import {Figure} from "./objects/Figure.js";

export class Playground {
    ground = []
    figure = null
    positionX = null
    positionY = null
    height = 20
    width = 10
    score = 0
    totalDeletedLines = 0
    running = true

    constructor(looper, width = 10, height = 20) {
        this.looper = looper
        this.height = height
        this.width = width

        for (let row = 0; row < this.height; row++) {
            this.ground[row] = []
            for (let column = 0; column < this.width; column++) {
                this.ground[row][column] = 0
            }
        }
    }

    restart(){
        console.log("Restart playground")
        this.clearPlayground()
        this.figure = null
        this.score = 0
        this.totalDeletedLines = 0
        this.running = true
    }

    clearPlayground() {
        console.log("clear playground")
        for (let row = 0; row < this.height; row++) {
            this.ground[row] = []
            for (let column = 0; column < this.width; column++) {
                this.ground[row][column] = 0
            }
        }
    }

    insertFigureAvailable(figure, positionX = this.positionX, positionY = this.positionY) {
        if (figure === null) return false
        for (let row = 0; row < figure.height; row++) {
            for (let column = 0; column < figure.width; column++) {
                // не надо проверять пустые клетки фигуры
                if (figure.matrix[row][column] === 0){
                    continue
                }
                // выход за пределы карты
                if (column + positionX < 0 || column + positionX >= this.width || row + positionY >= this.height) {
                    return false
                }
                // занято
                if (this.ground[row + positionY][column + positionX] !== 0){
                    return false
                }
            }
        }
        return true
    }


    setFigure(figure, positionX, positionY = 0) {
        // установить фигуру можно
        if (this.insertFigureAvailable(figure, positionX, positionY)) {
            this.figure = figure
            this.positionX = positionX
            this.positionY = positionY
            return true
        }
        // установить фигуру нельзя
        this.running = false
        return false
    }

    moveFigure(move){
        if (this.running === false) return false
        switch (move){
            case MoveDown:
                if (this.insertFigureAvailable(this.figure, this.positionX, this.positionY+1)){
                    this.positionY++;
                    return true
                } else {
                    // нельзя сдвинуть фигуру ниже -> зафиксиовать
                    this.fixFigure()
                    break
                }
            case MoveLeft:
                if (this.insertFigureAvailable(this.figure, this.positionX-1, this.positionY)){
                    this.positionX--;
                    return true
                }
                break
            case MoveRight:
                if (this.insertFigureAvailable(this.figure, this.positionX+1, this.positionY)){
                    this.positionX++;
                    return true
                }
                break
            case MoveDrop:
                while (this.moveFigure(MoveDown)){}
                this.looper.updateView()
                this.looper.generateFigure()
                return false
            case MoveRotate:
                if (this.figure === null) return false
                let rotateFigure = new Figure(this.figure.getRotateMatrix())
                if (this.insertFigureAvailable(rotateFigure)){
                    this.rotateFigure()
                    return true
                }
                break
        }
        return false
    }

    rotateFigure(){
        if (this.insertFigureAvailable(this.figure.getRotateMatrix())){
            this.figure.rotate()
        }
    }

    getView() {
        let view = []
        // установить во View поле
        for (let row = 0; row < this.height; row++) {
            view[row] = []
            for (let column = 0; column < this.width; column++) {
                view[row][column] = this.ground[row][column]
            }
        }

        //Установить во View фигуру
        if (this.figure != null) {
            for (let row = 0; row < this.figure.height; row++) {
                for (let column = 0; column < this.figure.width; column++) {
                    if (this.figure.matrix[row][column] === 0) continue
                    view[row + this.positionY][column + this.positionX] = Math.max(this.figure.matrix[row][column], view[row + this.positionY][column + this.positionX])
                }
            }
        }

        return view
    }


    fixFigure() {
        this.ground = this.getView()
        this.deleteFullLines()
    }

    deleteFullLines() {
        this.figure = null
        let topLine = 0
        let deletedLines = 0
        for (let row = this.height-1; row >= topLine; row--){
            let deleteRequire = true
            for (let column = 0; column < this.width; column++){
                if (this.ground[row][column] === 0){
                    deleteRequire = false
                    break
                }
            }
            if (deleteRequire){
                this.deleteLine(row)
                row++
                topLine++
                deletedLines++
                this.totalDeletedLines++
            }
        }
        let oldScore = this.score
        switch (deletedLines) {
            case 1:
                this.score+=100
                break
            case 2:
                this.score+=300
                break
            case 3:
                this.score+=700
                break
            case 4:
                this.score+=1500
                break
        }
        let repeat = Math.floor((this.score/1000)) - Math.floor((oldScore/1000))
        for (let i = 0; i < repeat; i++){
            this.looper.increaseLevel()
        }
    }

    deleteLine(row){
        const emptyRow = []
        for (let column = 0; column < this.width; column++){
            emptyRow.push(0)
        }
        this.ground.splice(row, 1)
        this.ground.unshift(emptyRow)
    }
}