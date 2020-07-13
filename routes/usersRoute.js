const Router = require('express').Router();
const {getUsers, getUser, postUser, putUser, deleteUser, login} = require('../controllers/usersController');
const {validateUser} = require('../middlewares/validator');
const {authToken, authAdmin} = require('../middlewares/authenticator');

Router.get('/', authToken, authAdmin, getUsers);
Router.get('/:id', getUser);
Router.post('/', validateUser(), postUser);
Router.post('/login', login)
Router.put('/:id', authToken, putUser);
Router.delete('/:id', authToken, deleteUser);

module.exports = Router;