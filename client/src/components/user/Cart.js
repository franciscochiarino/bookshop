import React from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import CartItem from './CartItem';
import { deleteOrderAndPutUser } from '../../actions/ordersActions'

function Cart({ books, user, dispatch, removeFromCart }) {
    const alert = useAlert();

    // Wait for user.orders
    if (!user.orders) { return <h3>Loading...</h3> }
    
    let totalPrice = 0;
    
    const cartItems = user.orders.map((order, i) => {

        // Get price of each book
        const { price } = books.find(({_id}) => order.book === _id);
        // Multiply it by order's quantity
        const orderPrice = price * order.quantity;
        // Add it to totalPrice
        totalPrice += orderPrice;

        return (
            <CartItem
                books={books}
                bookId={order.book}
                key={i}
                orderId={order._id}
                userId={user.id}
                quantity={order.quantity}
                date={order.date}
                removeFromCart={removeFromCart}
            />
        )
    })

    const confirmPurchase = async (userId) => {
        user.orders.map(({_id}) => {
            return dispatch(deleteOrderAndPutUser(_id, userId));
        })
        alert.success('Thank you for your purchase');
    }

    return (
        <section>
            <h3 className="sectionHeading">Shopping Cart</h3>
            <section className="cartItemsContainer">
                {cartItems}
            </section>
            <p className="totalPrice">Total amount ${totalPrice.toFixed(2)}</p>
            <div className="confirmBtn">
                <button className="checkout btn" onClick={() => confirmPurchase(user.id)}>Confirm Purchase</button>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        books: state.books.books
    }
};

export default connect(mapStateToProps)(Cart)