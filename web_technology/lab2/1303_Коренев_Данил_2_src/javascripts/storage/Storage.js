const FileManager = require('./FileManager');
const Book = require('../pojo/Book');

class Storage {
    availableID = 500
    constructor() {
        this.fileManager = new FileManager('./books.json');
        this.books = this.fileManager.readData().map(book =>
            new Book(book.title, book.author, book.year, book.dateReserve, book.dateReturn, book.reserverName, this.availableID++));
    }

    getAllBooks(sortBy) {
        var books = structuredClone(this.books)
        if (sortBy) {
            if (sortBy === 'returnDate') {
                books = books.filter(book => book.dateReturn);
                books.sort((a, b) => new Date(a.dateReturn) - new Date(b.dateReturn));
            } else if (sortBy === 'availability') {
                books = books.filter(book => book.dateReserve === null);
                console.log(books)
            } else if (sortBy === 'releaseYear') {
                books.sort((a, b) => a.year - b.year);
            } else if (sortBy === 'overdue') {
                books = books.filter(book => book.dateReturn && new Date(book.dateReturn) < new Date());
                books.sort((a, b) => new Date(a.dateReturn) - new Date(b.dateReturn));
            }
        }
        return books;
    }

    getBookById(id) {
        return this.books.find(book => book.id === id)
    }

    saveBooks() {
        this.fileManager.writeData(this.books);
    }

    addBook(book) {
        book.id = this.availableID++;

        const { title, author, id, year, dateReserve, dateReturn, reserverName } = book;
        const initializedBook = {
            title: title || null,
            author: author || null,
            year: year || null,
            dateReserve: dateReserve || null,
            dateReturn: dateReturn || null,
            reserverName: reserverName || null,
            id: id || this.availableID++
        };

        this.books.push(initializedBook);
        this.saveBooks();
        return book.id
    }

    deleteBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
        this.saveBooks();
    }

    updateBook(updateBook) {
        const index = this.books.findIndex(book => book.id === parseInt(updateBook.id));
        if (index !== -1) {
            this.books[index].title = updateBook.title
            this.books[index].author = updateBook.author
            this.books[index].year = updateBook.year
            this.saveBooks();
        }
    }

    updateBookDate(id, dateReserve, dateReturn, reserverName) {
        const index = this.books.findIndex(book => book.id === parseInt(id));
        if (index !== -1){
            this.books[index].dateReserve = dateReserve
            this.books[index].dateReturn = dateReturn
            this.books[index].reserverName = reserverName
            this.saveBooks()
        }
    }

    returnBook(id) {
        const index = this.books.findIndex(book => book.id === parseInt(id));
        if (index !== -1){
            this.books[index].dateReserve = null
            this.books[index].dateReturn = null
            this.books[index].reserverName = null
            this.saveBooks()
        }
    }
}

module.exports = Storage;
