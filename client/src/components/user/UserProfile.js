import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Assets
import cover from '../../assets/books-1097_231.png';
import settingsIcon from '../../assets/settings-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import shippingIcon from '../../assets/shipped.png';
import cartIcon from '../../assets/shopping-cart.png';
import wishListIcon from '../../assets/wish-list.png';
import Cart from './Cart';
// Actions
import { getBooks } from '../../actions/booksActions';

function UserProfile(props) {

    useEffect(() => {
        if (props.books.length === 0) {
            props.dispatch(getBooks());
        }
    }, [])

    const logout = () => {
        sessionStorage.removeItem('user');
        props.dispatch({ type: 'LOGOUT'});
    }

    // Wait for books if fetching is needed
    if (props.books.length === 0) {return null } 

        return (
            <div className="UserProfile">
                <section className="coverImg">

                    <img src={cover} alt="book store" className="cover" />
                    <div className="usernameContainer">
                        <h2>{props.user.firstName}</h2>
                        <div className="settingsLogoutContainer">
                            {props.user.role === 'Admin' ? 
                                <Link to="user/settings/admin"><img src={settingsIcon} alt="settings icon" title="Settings" /></Link> :
                                <Link to="user/settings"><img src={settingsIcon} alt="settings icon" title="Settings"/></Link>
                            }
                            <Link to="/" onClick={logout}><img src={logoutIcon} alt="log out icon" title="Log Out"/></Link>
                        </div>
                    </div>

                    <section className="userDashboard">
                        <div className="icons">
                            <button><img src={cartIcon} alt="cart icon" title="Cart"/></button>
                            <button><img src={wishListIcon} alt="wish list icon" title="Wish list"/></button>
                            <button><img src={shippingIcon} alt="shipping icon" title="Shipping"/></button>
                        </div>
                        <div className="userInfo">
                            <Cart user={props.user} books={props.books} removeFromCart={props.removeFromCart} />
                        </div>
                    </section>

                </section> 
            </div>
        )
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        books: state.books.books
    }
};

export default connect(mapStateToProps)(UserProfile);