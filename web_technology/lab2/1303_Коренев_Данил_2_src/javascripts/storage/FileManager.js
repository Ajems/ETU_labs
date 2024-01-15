const fs = require('fs');

class FileManager {
    constructor(filePath) {
        this.filePath = filePath;
    }
    readData() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }
    writeData(data) {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filePath, jsonData, 'utf8');
    }
}

module.exports = FileManager;