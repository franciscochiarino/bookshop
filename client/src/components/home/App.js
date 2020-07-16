// Modules
import React from 'react';
import { useAlert } from 'react-alert';
import { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions
import { getUser } from '../../actions/userActions'
import { postOrderAndPutUser, updateOrderQuantity, deleteOrderAndPutUser } from '../../actions/ordersActions';
// Components
import Home from './Home';
import Books from '../categories/Books';
import BookOverview from '../categories/BookOverview';
import SignUpForm from './SignUpForm';
import Login from './Login';
import UserProfile from '../user/UserProfile';
import AdminSettings from '../admin/AdminSettings';
import UserSettings from '../user/UserSettings';
import Nav from './Nav';

function App({ user, orders, dispatch }) {

    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        console.log('[App useEffect]')
        const data = sessionStorage.getItem('user');
        if (data) {
            const id = JSON.parse(data);
            dispatch(getUser(id));
        }
    }, [orders.shouldUserUpdate])

    const openSignUp = () => {
        const data = sessionStorage.getItem('user');
        if (data) {
            return alert.info('You are already logged in');
        }
        setSignUp(true)
    }

    const addToCart = (bookId, bookTitle) => {

        // Check if user is logged in
        if (!user.id) {
            return alert.info('Please log in to purchase an item');
        }

        // Check if user already has the book in the cart
        const order = user.orders.find(order => order.book === bookId);

        if (order) {
            // Update order quantity
            dispatch(updateOrderQuantity(order._id, order.quantity))
            alert.success(`A copy of ${bookTitle} has been added to your order.`)

        } else {
            // Create new order
            dispatch(postOrderAndPutUser(bookId, user.id))
            alert.success(`A copy of ${bookTitle} has been added to your cart.`) 
        } 
    }

    const removeFromCart = (orderId, userId) => {
        dispatch(deleteOrderAndPutUser(orderId, userId));
        alert.success(`Order removed.`)
    }
    
    return (
        <div className="App">
            <BrowserRouter>

                <header>
                    <Link id="siteTitle" to="/"><h1>BOOKSHOP</h1></Link>
                    <Nav user={user} setLogin={setLogin} openSignUp={openSignUp} />
                </header>

                {/* Signup and Login*/}
                {signUp ? <div className="darkBg"> <SignUpForm setSignUp={setSignUp} /> </div> : null}
                {login ? <div className="darkBg"> <Login setLogin={setLogin} /> </div> : null}

                {/* Routes */}
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/books/:genre' render={ (props) => <Books {...props} addToCart={addToCart} /> } />
                    <Route exact path='/books/book/:id' render={ (props) => <BookOverview {...props} addToCart={addToCart} /> } />     
                    <Route exact path='/users/user' render={ (props) => <UserProfile {...props} removeFromCart={removeFromCart} /> } />
                    <Route exact path='/users/user/settings' render={ (props) => <UserSettings {...props} user={user} dispatch={dispatch} /> } />
                    <Route exact path='/users/user/settings/admin' component={AdminSettings} />
                </Switch>

            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        orders: state.orders
    }
};

export default connect(mapStateToProps)(App);
