import {Figure} from "./objects/Figure.js";
import {ColorConverter} from "./objects/ColorConverter.js";

export class FigureGenerator {

    constructor() {
        this.nextFigure = this.getRandomFigure()
    }
    getRandomFigure() {
        console.log("generate")
        let figureNumber = Math.floor(Math.random() * (this.figureAsset.length))
        return new Figure(this.figureAsset[figureNumber])
    }

    getNext() {
        let tmp = this.nextFigure
        this.nextFigure = this.getRandomFigure()

        this.canvas = document.getElementById('next_figure')
        this.contextCanvas = this.canvas.getContext('2d')
        this.color = new ColorConverter()
        this.grid = 32

        this.contextCanvas.clearRect(0, 0, 128, 128);
        for (let row = 0; row < this.nextFigure.height; row++){
            for (let column = 0; column < this.nextFigure.width; column++){
                this.contextCanvas.fillStyle = this.color.color[this.nextFigure.matrix[row][column]]
                this.contextCanvas.fillRect(column * this.grid, row * this.grid, this.grid - 1, this.grid - 1);
            }
        }

        return tmp
    }

    figureAsset = [
        [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0]
        ],
        [
            [0, 2, 0],
            [2, 2, 2],
            [0, 0, 0]],
        [
            [3, 3, 0],
            [0, 3, 3],
            [0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [4, 4, 4, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [5, 5],
            [5, 5]
        ],
        [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ],
        [
            [7, 7, 7],
            [0, 0, 7],
            [0, 0, 0]
        ]
    ]
}