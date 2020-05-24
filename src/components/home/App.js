
import React from 'react';
import {useState, useEffect} from 'react';
import {BrowserRouter, NavLink, Route, Switch, Link} from 'react-router-dom';
import Home from './Home';
import Books from './Books';
import BookOverview from './BookOverview';
import SignUpForm from './SignUpForm';
import Login from './Login';
import UserProfile from './UserProfile';
import AdminSettings from './AdminSettings';
import {connect} from 'react-redux';

function App(props) {

    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {

        getBooks();
        getUser();

    }, [props.state.updateUser, props.state.updateBooks]);

    const getUser = async () => {
        const data = sessionStorage.getItem('user');
        if (data) {
            // Get id from session storage
            const id = JSON.parse(data);
            // Get user from db
            const response = await fetch(`http://localhost:3001/users/${id}`);
            const dataFromDB = await response.json();

            if (dataFromDB.user) {
                props.dispatch({
                    type: 'STORE_USER',
                    payload: dataFromDB.user
                })
            }
        }
    }

    const getBooks = async () => {
        // Get books from database
        const response = await fetch('http://localhost:3001/books');
        const data = await response.json();
        // Store in state
        props.dispatch({
            type: 'STORE_BOOKS',
            payload: data.books
        })
    };

    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <h1>BOOKSHOP</h1>
                        <nav>
                            <div>
                                <NavLink className="navLink" activeClassName="navActive" to='/'>HOME</NavLink>
                                <NavLink className="navLink" activeClassName="navActive" to='/books/favorites'>FAVORITES</NavLink>
                                <NavLink className="navLink" activeClassName="navActive" to='/books/fiction'>FICTION</NavLink>
                                <NavLink className="navLink" activeClassName="navActive" to='/books/mystery'>MYSTERY</NavLink>
                                <NavLink className="navLink" activeClassName="navActive" to='/books/tech'>TECH</NavLink>
                                <NavLink className="navLink" activeClassName="navActive" to='/books/biography'>BIOGRAPHY</NavLink>
                            </div>
                            <div>
                                {props.state.user.email ? 
                                    <button className="userLink"><Link to='/users/user'>ACCOUNT</Link></button> : 
                                    <button className="userLink" onClick={() => setLogin(true)}>LOG IN</button>
                                }
                                <button className="userLink" onClick={() => setSignUp(true)}>SIGN UP</button>
                            </div>
                        </nav>
                </header>

                {/* Signup and Login*/}
                {signUp ? <SignUpForm setSignUp={setSignUp} /> : null}
                {login ? <Login setLogin={setLogin} /> : null}

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/books/:genre' component={Books} />
                    <Route exact path='/books/book/:id' component={BookOverview} />
                    <Route exact path='/users/user' component={UserProfile} />
                    <Route exact path='/users/user/settings/admin' component={AdminSettings} />
                </Switch>

            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {state}
};

export default connect(mapStateToProps)(App);
