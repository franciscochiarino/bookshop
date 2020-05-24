import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import CartItem from './CartItem';

function Cart(props) {

    const cartItems = props.state.user.orders.map((order, i) => {
        return (
            <CartItem
                key={i}
                quantity={order.quantity}
                bookId={order.book}
                date={order.date}
            />
        )
    })

    return (
        <section>
            <h3 className="sectionHeading">Shopping Cart</h3>
            <section className="cartItemsContainer">
                {cartItems}
            </section>
            <div className="confirmBtn">
                <button className="checkout btn">Confirm Purchase</button>
            </div>
        </section>
    )
}


const mapStateToProps = state => {
    return {state}
}

export default connect(mapStateToProps)(Cart)