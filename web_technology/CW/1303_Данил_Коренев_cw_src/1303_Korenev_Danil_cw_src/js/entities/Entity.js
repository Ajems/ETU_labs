export class Entity {
    constructor() {
        this.name = ""
        this.pos_x = 0
        this.pos_y = 0
        this.size_x = 0
        this.size_y = 0
    }
    onTouchEntity(obj) {}

    getSpriteName() {
        return "entity"
    }

    isInside(obj){}
}
