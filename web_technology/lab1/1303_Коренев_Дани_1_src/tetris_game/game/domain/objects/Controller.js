import {MoveDrop, MoveLeft, MoveRight, MoveRotate} from "./Move.js";

export class Controller {

    playground = null

    setPlayground(playground){
        this.playground = playground
    }
    listen(looper) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.playground.moveFigure(MoveLeft)
                    break
                case "ArrowRight":
                    this.playground.moveFigure(MoveRight)
                    break
                case "ArrowDown":
                    this.playground.moveFigure(MoveDrop)
                    break
                case "ArrowUp":
                    this.playground.moveFigure(MoveRotate)
                    break
            }
            looper.updateView()
        })
    }
}