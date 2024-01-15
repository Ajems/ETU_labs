class Session {
    sessions = new Map();
    constructor() {}
    addSession(id, token) {
        console.log(`token is ${token}`)
        this.sessions.set(token, id)
    }

    checkSession(token) {
        if (this.sessions.has(token)){
            return this.sessions.get(token)
        } else {
            return null
        }
    }
}

module.exports = Session;