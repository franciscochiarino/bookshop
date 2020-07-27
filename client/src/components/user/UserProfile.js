import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
// Assets
import cover from '../../assets/books-1097_231.png';
import settingsIcon from '../../assets/settings-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
// import shippingIcon from '../../assets/shipped.png';
import cartIcon from '../../assets/shopping-cart.png';
// import wishListIcon from '../../assets/wish-list.png';
import Cart from './Cart';
// Actions
import { getBooks } from '../../actions/booksActions';

function UserProfile({ user, books, removeFromCart, dispatch, loading }) {
    const [ , , removeCookie] = useCookies(['x-auth']);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(getBooks());
        }
    }, [books.length, dispatch])

    const logout = () => {
        sessionStorage.removeItem('user');
        removeCookie('x-auth');
        dispatch({ type: 'LOGOUT'});
    }

    // Wait for books if fetching is needed
    // if (books.length === 0) { return null } 

        return (
            <div className="UserProfile">
                <section className="coverImg">

                    <img src={cover} alt="book store" className="cover" />
                    <div className="usernameContainer">
                        <h2>{user.firstName}</h2>
                        <div className="settingsLogoutContainer">
                            {user.role === 'Admin' ? 
                                <Link to="user/settings/admin"><img src={settingsIcon} alt="settings icon" title="Settings" /></Link> :
                                <Link to="user/settings"><img src={settingsIcon} alt="settings icon" title="Settings"/></Link>
                            }
                            <Link to="/" onClick={logout}><img src={logoutIcon} alt="log out icon" title="Log Out"/></Link>
                        </div>
                    </div>

                    <section className="userDashboard">
                        <div className="icons">
                            <button><img src={cartIcon} alt="cart icon" title="Cart"/></button>
                            {/* <button><img src={wishListIcon} alt="wish list icon" title="Wish list"/></button> */}
                            {/* <button><img src={shippingIcon} alt="shipping icon" title="Shipping"/></button> */}
                        </div>
                        <div className="userInfo">
                            <Cart user={user} books={books} removeFromCart={removeFromCart} />
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