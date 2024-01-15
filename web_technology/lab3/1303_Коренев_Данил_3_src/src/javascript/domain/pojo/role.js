class Role {
    constructor(nameRole) {
        this.name = nameRole
    }
}

class AdminRole extends Role {
    constructor() {
        super('admin');
    }
}

class UserRole extends Role {
    constructor() {
        super('user');
    }
}

module.exports = Role;