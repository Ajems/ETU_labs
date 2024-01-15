class StorageManager {

    RECORDS_KEY_LVL_1 = 'RECORDS_STORAGE_LVL1'
    RECORDS_KEY_LVL_2 = 'RECORDS_STORAGE_LVL2'
    levelsKeys = {
        1: this.RECORDS_KEY_LVL_1,
        2: this.RECORDS_KEY_LVL_2
    }
    records = {
        1: [],
        2: []
    }
    constructor(level) {
        this.loadRecords(level);
    }

    loadRecords(level) {
        const recordsStr = localStorage.getItem(this.levelsKeys[level]);
        this.records[level] = recordsStr ? JSON.parse(recordsStr) : [];
        console.log(this.records)
    }

    addNewResult(result, level) {
        this.records[level].push(result);
        this.saveRecords(level);
    }

    getAllRecords(level) {
        return this.records[level];
    }

    saveRecords(level) {
        localStorage.setItem(this.levelsKeys[level], JSON.stringify(this.records[level]));
    }
}

export const storageManager = new StorageManager()