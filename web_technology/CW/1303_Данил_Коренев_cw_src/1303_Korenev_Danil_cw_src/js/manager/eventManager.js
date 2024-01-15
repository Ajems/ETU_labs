class EventManager {
    constructor() {
        this.bind = []
        this.action = []
    }
    setup() {
        this.bind[87] = 'up'
        this.bind[65] = 'left'
        this.bind[83] = 'down'
        this.bind[68] = 'right'
        this.bind[32] = 'fire'
        canvas.addEventListener("mousedown", this.onMouseDown)
        canvas.addEventListener("mouseup", this.onMouseUp)
        document.body.addEventListener('keydown', this.onKeyDown)
        document.body.addEventListener('keyup', this.onKeyUp)
    }

    onMouseDown = (event) => {
        eventManager.action['fire'] = true
    }
    onMouseUp = (event) => {
        eventManager.action['fire'] = false
    }

    onKeyDown = (event) => {
        let action = eventManager.bind[event.keyCode]
        if (action) {
            eventManager.action[action] = true
        }
    }

    onKeyUp = (event) => {
        let action = eventManager.bind[event.keyCode]
        if (action) {
            eventManager.action[action] = false
        }
    }
}

export const eventManager = new EventManager()