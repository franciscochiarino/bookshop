import React, { useEffect } from 'react'
import {connect} from 'react-redux';

function CartItem(props) {

    // Get book from state
    const book = props.state.books.find(book => book._id === props.bookId);
    
    return (
        <div className="cartItemCard">
            <img src={`http://localhost:3001/books/cover/${book.cover}`} height="180" alt=""/>
            <section className="cartItemCardText">
                <p>{book.title}</p>
                <p>by {book.author}</p>
                <p>Quantity: {props.quantity}</p>
                <p className="cardPrice">${book.price}</p>
                <button className="overviewBtn">Move to wishlist</button>
                <button className="overviewBtn">Remove from cart</button>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {state}
}

export default connect(mapStateToProps)(CartItem)