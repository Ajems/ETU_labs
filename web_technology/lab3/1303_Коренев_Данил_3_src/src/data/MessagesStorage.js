const fs = require('fs');
const path = require('path');

class MessagesStorage {
    constructor() {
        this.filePath = path.join(__dirname, 'storage/messages');
    }

    getMessages(senderId, receiverId) {
        const filePath = path.join(this.filePath, `messages_${senderId}_${receiverId}.json`);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getMessagesForId(userId) {
        const messageFiles = fs.readdirSync(this.filePath);
        const userMessages = [];

        messageFiles.forEach(file => {
            const match = file.match(/messages_(\d+)_(\d+).json/);
            if (match) {
                const senderId = match[1];
                const receiverId = match[2];

                if (senderId === userId || receiverId === userId) {
                    const messages = this.getMessages(senderId, receiverId);
                    userMessages.push(...messages);
                }
            }
        });

        return userMessages;
    }

    addMessage(senderId, receiverId, message) {
        const filePath = path.join(this.filePath, `messages_${senderId}_${receiverId}.json`);
        let messages = this.getMessages(senderId, receiverId);
        messages.push(message);
        this.saveData(filePath, messages);
    }

    saveData(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
}

module.exports = MessagesStorage;
