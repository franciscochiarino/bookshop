const Router = require('express').Router();
const {getBooks, getBook, getBookCover, postBook, putBook, deleteBook, postBookCover} = require('../controllers/booksController');

Router.get('/', getBooks);
Router.get('/:id', getBook);
Router.get('/cover/:filename', getBookCover)
Router.post('/', postBook);
Router.post('/cover', postBookCover);
Router.put('/:id', putBook);
Router.delete('/:id', deleteBook);

module.exports = Router;