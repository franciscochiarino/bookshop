import React from 'react'

export default function CartItem(props) {

    
    const book = props.books.find(book => book._id === props.bookId);    
    if (!book) {return null }

    return (
        <div className="CartItem">
            <img src={`/books/cover/${book.cover}`} height="180" alt={`${book.title} by ${book.author} book cover`}/>
            <section className="cartItemCardText">
                <p>{book.title}</p>
                <p>by {book.author}</p>
                <p>Quantity: {props.quantity}</p>
                <p className="cardPrice">${book.price}</p>
                <button className="overviewBtn">Move to wishlist</button>
                <button className="overviewBtn" onClick={() => props.removeFromCart(props.orderId, props.userId)} >Remove from cart</button>
            </section>
        </div>
    )
}
