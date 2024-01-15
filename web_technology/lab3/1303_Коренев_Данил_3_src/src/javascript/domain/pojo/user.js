// const Status = require('Status')
// const ActiveStatus = require('Status')
// const UnconfirmedStatus = require('Status')
// const BlockedStatus = require('Status')
// const Role = require('Role')
// const AdminRole = require('Role')
// const UserRole = require('Role')
// const UserData = require('UserData')

const UserData = require("./userData");
const Role = require("./role");
const Status = require("./status");

class User{
    constructor(id, data, password, role, status){
        this.id = id
        this.data = (data instanceof UserData) ? data : null;
        this.password = password
        this.role = (role instanceof Role) ? role : null;
        this.status = (status instanceof Status) ? status : null;
    }

    static getInstance(id, data, password, role) {
        if (data instanceof UserData && role instanceof Role) {
            return new User(id, data, password, role);
        } else {
            throw new Error("Невалидные аргументы");
        }
    }

    changeRole(role) {
        if(role instanceof Role){
            this.role = role
        } else {
            throw new Error("The argument inside changeRole is not instance of class Role")
        }
    }

    changeStatus(status) {
        if(status instanceof Status){
            this.status = status
        } else {
            throw new Error("The argument inside changeStatus is not instance of class Status")
        }
    }

    changeData(data){
        if (data instanceof UserData) {
            this.data = data
        } else {
            throw new Error("The argument inside changeData is not instance of class UserData")
        }
    }

    changePassword(password){
        if (password.length > 1) {
            this.password = password
        } else {
            throw new Error("The argument inside changePassword too short")
        }
    }
}

module.exports = User;