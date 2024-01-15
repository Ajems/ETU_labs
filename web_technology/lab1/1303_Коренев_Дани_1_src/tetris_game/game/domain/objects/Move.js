export class Move {
    moveDirection = null
}

export class MoveDown extends Move {
    moveDirection = "DOWN"
}
export class MoveLeft extends Move {
    moveDirection = "LEFT"
}
export class MoveRight extends Move {
    moveDirection = "RIGHT"
}

export class MoveDrop extends Move {
    moveDirection = "DROP"
}

export class MoveRotate extends Move {
    moveDirection = "ROTATE"
}