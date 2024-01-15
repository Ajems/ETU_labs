export class Figure {

    matrix = null
    height = null
    width = null
    size = null
    constructor(matrix) {
        this.matrix = matrix
        this.height = matrix.length
        this.width = matrix[0].length
        this.size = this.height
    }

    getRotateMatrix() {
        const newMatrix = [];
        for (let i = 0; i < this.width; i++) {
            newMatrix.push([]);
            for (let j = this.height - 1; j >= 0; j--) {
                newMatrix[i].push(this.matrix[j][i]);
            }
        }
        return newMatrix;
    }

    rotate(){
        this.matrix = this.getRotateMatrix()
    }
}