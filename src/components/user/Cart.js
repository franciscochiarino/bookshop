import React from 'react'
import CartItem from './CartItem';

export default function Cart(props) {

    // Wait for user.orders
    if (!props.user.orders) { return <h3>Loading...</h3> }

    const cartItems = props.user.orders.map((order, i) => {
        console.log('[order in Cart:]', order)
        return (
            <CartItem
                books={props.books}
                bookId={order.book}
                key={i}
                orderId={order._id}
                userId={props.user.id}
                quantity={order.quantity}
                date={order.date}
                removeFromCart={props.removeFromCart}
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
