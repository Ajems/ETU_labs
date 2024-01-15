export class Level {

    defaultTime = 1
    timeSpeed = null
    minLevel = 1
    maxStartLevel = 10
    constructor(timeSpeed) {
        if (timeSpeed < this.minLevel) {
            this.timeSpeed = this.minLevel
        } else if (timeSpeed > this.maxStartLevel) {
            this.timeSpeed = this.maxStartLevel
        } else {
            this.timeSpeed = this.defaultTime
        }
    }

    setDefault() {
        this.timeSpeed = this.defaultTime
    }
}