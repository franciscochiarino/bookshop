import { combineReducers } from 'redux';
import books from './booksReducer';
import user from './userReducer';
import orders from './ordersReducers';

export default combineReducers({ books, user, orders });