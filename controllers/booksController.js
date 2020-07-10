const Book = require('../models/bookSchema');
const createError = require('http-errors');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

// Import uploadFiles middleware
const uploadFilesMiddleware = require('../middlewares/uploadFiles');

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json({ success: true, books: books});
    }
    catch(err) {
        next(err);
    }
    
};

exports.getBook = async (req, res, next) => {
    try {
        const book = await (await Book.findById(req.params.id));
        if (!book) throw createError(404);
        res.json({ success: true, book: book}); 
    }
    catch(err) {
        next(err);
    }
}

exports.getBookCover = async (req, res, next) => {
    try {
        const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/contextManager");
        connection.once('open', function () {
            const gfs = Grid(connection.db, mongoose.mongo);
            gfs.collection('covers');

            gfs.files.findOne({filename: req.params.filename}, (err, file) => {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            })
        })
    }
    catch(err) {
        next(err);
    }
}

exports.postBook = async (req, res, next) => {
    try {
        const book = new Book(req.body);
        book.save();
        res.json({ success: true, book: book}); 
    }
    catch(err) {
        console.log('Error from postBook:', err);
        next(err);
    }
};

exports.postBookCover = async (req, res, next) => {
    try {
        // Check if we have an image
        await uploadFilesMiddleware(req, res);
        const file = req.file;
        res.json({ success: true, file: file })
        
        if (!req.file) {
            return res.json({ message: 'You must select a file'});
        }
        console.log('File is uploaded');
    }
    catch(err) {
        next(err);
    }
};

exports.putBook = async (req, res, next) => {
    const id = req.params.id;
    const book = req.body;
    try {
        const updateBook = await Book.findByIdAndUpdate(id, book, {new: true});
        if (!updateBook) throw createError(404);
        res.json({ success: true, book: updateBook}); 
    }
    catch(err) {
        next(err);
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) throw createError(404);
        res.json({ success: true}); 
    }
    catch(err) {
        next(err);
    }
};



