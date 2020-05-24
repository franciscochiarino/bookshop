import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import cover from '../../assets/books-1097_231.png';
import settingsIcon from '../../assets/settings-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import shippingIcon from '../../assets/shipped.png';
import cartIcon from '../../assets/shopping-cart.png';
import wishListIcon from '../../assets/wish-list.png';
import Cart from '../user/Cart';

function UserProfile(props) {

    const logOut = () => {
        sessionStorage.removeItem('user');
        props.dispatch({ type: 'LOG_OUT'})
    }

    return (
        <div>
            <section className="coverImg">
                <img src={cover} alt="book store"/>
                <div className="usernameContainer">
                    <h2>{props.state.user.firstName}</h2>
                    <div className="settingsLogoutContainer">
                        {props.state.user.role === 'Admin' ? 
                            <Link to="user/settings/admin"><img src={settingsIcon} alt="settings icon" title="Settings" /></Link> :
                            <Link to="user/settings"><img src={settingsIcon} alt="settings icon" title="Settings"/></Link>
                        }
                        <Link to="/" onClick={logOut}><img src={logoutIcon} alt="log out icon" title="Log Out"/></Link>
                    </div>
                </div>
            </section> 
            <section className="userDashboard">
                <div className="icons">
                    <button><img src={cartIcon} alt="cart icon" title="Cart"/></button>
                    <button><img src={wishListIcon} alt="wish list icon" title="Wish list"/></button>
                    <button><img src={shippingIcon} alt="shipping icon" title="Shipping"/></button>
                </div>
                <div className="userInfo">
                    <Cart />
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {state}
};

export default connect(mapStateToProps)(UserProfile);