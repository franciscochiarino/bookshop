import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// Set middlewares
// const middleware = [promise(), thunk];
const middleware = applyMiddleware(thunk, promise);

// Export store (reducer is all of our combined reducers)
export default createStore(reducer, composeWithDevTools(middleware))