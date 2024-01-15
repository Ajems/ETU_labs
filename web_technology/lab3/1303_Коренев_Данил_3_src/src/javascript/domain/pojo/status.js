class Status {
    constructor(statusLevel) {
        this.statuses = new Map()
        this.statuses.set(1, "active")
        this.statuses.set(2, "unconfirmed")
        this.statuses.set(3, "blocked")

        this.status = this.statuses.get(statusLevel)
        if (this.status === undefined){
            this.status = this.statuses.get(3)
        }
    }
}

class ActiveStatus extends Status {
    constructor() {
        super(1);
    }
}

class UnconfirmedStatus extends Status {
    constructor() {
        super(2);
    }
}

class BlockedStatus extends Status {
    constructor() {
        super(3);
    }
}

module.exports = Status;
