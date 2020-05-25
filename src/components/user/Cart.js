import React from 'react'
import CartItem from './CartItem';

export default function Cart(props) {

    // Wait for user.orders
    if (!props.user.orders) { return <h3>Loading...</h3> }

    const cartItems = props.user.orders.map((order, i) => {
        return (
            <CartItem
                key={i}
                quantity={order.quantity}
                bookId={order.book}
                date={order.date}
                books={props.books}
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
