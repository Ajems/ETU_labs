const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Storage = require('../javascripts/storage/Storage.js');
const storage = new Storage();
const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/covers');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storageImage });

const router = express.Router();

router.get('/library', function(req, res, next) {
  const books = storage.getAllBooks();
  res.render('booksList/main', { books: books });
});

router.get('/library/book/:bookId', (req, res, next) => {
  const id = parseInt(req.params.bookId);
  const book = storage.getBookById(id)
  res.render('currentBook/book', { book: book } );
});

router.post('/library/addBook', upload.single('cover'), (req, res) => {
    const book = req.body;
    const id = storage.addBook(book);

    if (req.file) {
        const tempPath = req.file.path;
        const targetPath = path.join('public/covers', `${id}.jpg`);

        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Ошибка при переименовании файла' });
            }
            return res.status(200).json({ message: 'Книга успешно добавлена' });
        });
    } else {
        return res.status(200).json({ message: 'Книга успешно добавлена (без обложки)' });
    }
});

router.delete('/library/deleteBook', (req, res) => {
    const { id } = req.body;
    storage.deleteBook(id)

    const imagePath = path.join(__dirname, '../public/covers', `${id}.jpg`);
    fs.stat(imagePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(200).json({ message: 'Книга успешно удалена.' });
            } else {
                console.error(err);
                return res.status(500).json({ message: 'Ошибка при проверке файла обложки' });
            }
        }
        fs.unlink(imagePath, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Ошибка при удалении файла обложки' });
            }
            res.status(200).json({ message: 'Книга успешно удалена.' });
        });
    });
});

router.get('/library/getBook/:bookId', (req, res, next) => {
    const id = parseInt(req.params.bookId);
    const book = storage.getBookById(id);
    res.status(200).json(book);
})

router.put(`/library/updateBook/:bookId`, upload.single('cover'), (req, res, next) => {
    const bookId = req.params.bookId;
    const updatedBook = req.body;
    const coverFile = req.file;

    if (coverFile) {
        const tempPath = coverFile.path;
        const targetPath = path.join('public/covers', `${bookId}.jpg`);

        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Ошибка при переименовании файла' });
            }
            updatedBook.cover = `${bookId}.jpg`;
            storage.updateBook(updatedBook);
            return res.status(200).json({ message: 'Книга успешно обновлена' });
        });
    } else {
        storage.updateBook(updatedBook);
        return res.status(200).json({ message: 'Книга успешно обновлена (без обложки)' });
    }
});

router.post('/library/reserveBook', (req, res) => {
    const { id, dateReserve, dateReturn, reserverName } = req.body;
    storage.updateBookDate(parseInt(id), dateReserve, dateReturn, reserverName)
    res.status(200).json({ message: "Книга успешно зарезервирована" });
});

router.put('/library/returnBook', (req, res) => {
    const { id } = req.body;
    storage.returnBook(parseInt(id))
    res.status(200).json({ message: "Книга успешно возвращена" });
})

router.post('/library/filter-books', (req, res) => {
    const sortBy = req.body.sortBy;
    res.json(storage.getAllBooks(sortBy));
});

module.exports = router