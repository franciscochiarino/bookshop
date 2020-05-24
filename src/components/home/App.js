
import React from 'react';
import {useState, useEffect} from 'react';
import {BrowserRouter, NavLink, Route, Switch, Link} from 'react-router-dom';
import Home from './Home';
import Books from '../categories/Books';
import BookOverview from '../categories/BookOverview';
import SignUpForm from './SignUpForm';
import Login from './Login';
import UserProfile from '../user/UserProfile';
import AdminSettings from '../admin/AdminSettings';
import {connect} from 'react-redux';
import { getUser } from '../../actions/userActions'

function App(props) {

    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        console.log('[App useEffect]')
        const data = sessionStorage.getItem('user');
        if (data) {
            const id = JSON.parse(data);
            props.dispatch(getUser(id));
        }
    }, [])

    const openSignUp = () => {
        const data = sessionStorage.getItem('user');
        if (data) {
            return alert('You are already logged in');
        }
        setSignUp(true)
    }

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
                                {props.user.email ? 
                                    <button className="userLink"><Link to='/users/user'>ACCOUNT</Link></button> : 
                                    <button className="userLink" onClick={() => setLogin(true)}>LOG IN</button>
                                }
                                <button className="userLink" onClick={openSignUp}>SIGN UP</button>
                            </div>
                        </nav>
                </header>

                {/* Signup and Login*/}
                {signUp ? <SignUpForm setSignUp={setSignUp} /> : null}
                {login ? <Login setLogin={setLogin} /> : null}

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/books/:genre' render={(props) => <Books {...props} />} />
                    <Route exact path='/books/book/:id' component={BookOverview} />
                    <Route exact path='/users/user' component={UserProfile} />
                    <Route exact path='/users/user/settings/admin' component={AdminSettings} />
                </Switch>

            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
};

export default connect(mapStateToProps)(App);
