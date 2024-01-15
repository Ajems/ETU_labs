const fs = require('fs');
const path = require('path');

class FriendsStorage {
    constructor() {
        this.filePath = path.join(__dirname, 'storage/friends');
    }

    getFriendsId(userId) {
        const filePath = path.join(this.filePath, `friends_id_${userId}.json`);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    addFriend(userId, friendId) {
        const filePath = path.join(this.filePath, `friends_id_${userId}.json`);
        let friends = this.getFriendsId(userId);
        friends.push(friendId);
        this.saveData(filePath, friends);
    }

    removeFriend(userId, friendId) {
        const filePath = path.join(this.filePath, `friends_id_${userId}.json`);
        let friends = this.getFriendsId(userId);
        friends = friends.filter(id => id !== friendId);
        this.saveData(filePath, friends);
    }

    saveData(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
}

module.exports = FriendsStorage;