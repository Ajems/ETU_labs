const fs = require('fs');
const path = require('path');
const UserData = require('../javascript/domain/pojo/userData')
const User = require('../javascript/domain/pojo/user')
const Status = require('../javascript/domain/pojo/status')
const ActiveStatus = require('../javascript/domain/pojo/status')
const UnconfirmedStatus = require('../javascript/domain/pojo/status')
const BlockedStatus = require('../javascript/domain/pojo/status')
const Role = require('../javascript/domain/pojo/role')
const AdminRole = require('../javascript/domain/pojo/role')
const UserRole = require('../javascript/domain/pojo/role')


class UsersStorage {
    constructor() {
        this.filePath = path.join(__dirname, 'storage/users.json');
    }

    getUsersJson() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getUsers() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const jsonData = JSON.parse(data);

            const users = jsonData.map(user => {
                const userData = new UserData(
                    user.data.fName,
                    user.data.mName,
                    user.data.lName,
                    user.data.birthday,
                    user.data.email
                );

                let role;
                if (user.role.name === "admin") {
                    role = new AdminRole();
                    role.name = "admin"
                } else if (user.role.name === "user") {
                    role = new UserRole();
                    role.name = "user"
                }

                let status;
                if (user.status.status === "active") {
                    status = new ActiveStatus();
                    status.status = "active"
                } else if (user.status.status === "unconfirmed") {
                    status = new UnconfirmedStatus();
                    status.status = "unconfirmed"
                } else if (user.status.status === "blocked") {
                    status = new BlockedStatus();
                    status.status = "blocked"
                }

                return new User(user.id, userData, user.password, role, status);
            });

            return users
        } catch (error) {
            console.error('Error reading the file:', error);
            return [];
        }
    }

    updateUserData(userId, userData) {
        const users = this.getUsersJson();
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                user.data = userData
            }
            return user;
        });
        this.saveData(updatedUsers);
    }

    addUser(newUser) {
        const users = this.getUsersJson();
        users.push(newUser);
        this.saveData(users);
    }

    accessRequest(email, password) {
        const users = this.getUsersJson();
        const requiredUser = users.find(user =>
            user.data.email === email && user.password === password
        );

        return requiredUser || null
    }

    getUserById(userId) {
        const users = this.getUsersJson();
        const foundUser = users.find(user => user.id === userId);
        return foundUser || null;
    }

    changeRole(userId, role) {
        const users = this.getUsersJson();
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                user.role.name = role
            }
            return user;
        });
        this.saveData(updatedUsers);
    }

    changeStatus(userId, status) {
        const users = this.getUsersJson();
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                user.status.status = status
            }
            return user;
        });
        this.saveData(updatedUsers);
    }

    saveData(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data));
    }
}

module.exports = UsersStorage;
