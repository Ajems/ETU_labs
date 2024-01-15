class Book {
    constructor(title, author, year, dateReserve, dateReturn, reserverName, id) {
        this.title = title
        this.author = author
        this.year = year
        this.dateReserve = dateReserve
        this.dateReturn = dateReturn
        this.reserverName = reserverName
        this.id = id
    }
}
module.exports = Book