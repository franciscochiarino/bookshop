import React, { useState } from 'react'
import CartItem from './CartItem';

export default function Cart(props) {

    // Wait for user.orders
    if (!props.user.orders) { return <h3>Loading...</h3> }

    let totalPrice = 0;

    const cartItems = props.user.orders.map((order, i) => {

        // Get price of each book
        const {price} = props.books.find(({_id}) => order.book === _id);
        // Multiply it by order's quantity
        const orderPrice = price * order.quantity;
        // Add it to totalPrice
        totalPrice += orderPrice;

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
            <p className="totalPrice">Total amount ${totalPrice}</p>
            <div className="confirmBtn">
                <button className="checkout btn">Confirm Purchase</button>
            </div>
        </section>
    )
}
