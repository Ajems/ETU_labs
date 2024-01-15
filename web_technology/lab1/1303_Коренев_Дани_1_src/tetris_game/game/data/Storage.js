export class Storage {

    RECORDS_KEY = 'RECORDS_STORAGE'
    constructor() {
        this.loadRecords();
    }

    loadRecords() {
        const recordsStr = localStorage.getItem(this.RECORDS_KEY);
        this.records = recordsStr ? JSON.parse(recordsStr) : [];
    }

    addNewResult(result) {
        this.records.push(result);
        this.saveRecords();
    }

    getAllRecords() {
        return this.records;
    }

    saveRecords() {
        localStorage.setItem(this.RECORDS_KEY, JSON.stringify(this.records));
    }
}