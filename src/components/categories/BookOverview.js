import React, {useEffect} from 'react'
import {connect} from 'react-redux';

function BookOverview(props) {

    // FIXME: Book is undefined if we don't come from App.js
    const book = props.state.books.find(({_id}) => _id === props.match.params.id);

    // TODO: Almost same function in BookCard.js
    const addToCart = async () => {

        // Define order
        const order = {
            quantity: 1,
            book: book._id,
        }

        // Set post request options
        const post = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        };

        // Post order
        const orderRes = await fetch('http://localhost:3001/orders', post);
        const orderData = await orderRes.json();

        // Set put request options
        const put = {
            method: 'PUT',
            headers: { 
                'content-type': 'application/json'
            },
            // Push to orders array
            body: JSON.stringify({ $push: {orders: orderData.order._id}})
        };

        // Put user
        const userRes = await fetch(`http://localhost:3001/users/${props.state.user.id}`, put);
        const userData = await userRes.json();
        console.log(userData)

        // Update store
        props.dispatch({
            type: 'UPDATE_USER'
        })
    }

    return (
    
        <section className="bookOverview">
            <div>
            <img src={`http://localhost:3001/books/cover/${book.cover}`} alt={`${book.title} book cover`}/>
            </div>
            <section className="overviewText">
                <h2>{book.title}</h2>
                <p className="author">by {book.author} - {book.published}</p>
                <p className="reviewCount">★★★★★</p>
                <p className="text">{book.overview}</p>
                <p className="price">${book.price}</p>
                <div className="mainBtn">
                    <button className="overviewBtn">Add to wish list</button>
                    <button className="buyBtn" onClick={addToCart}>Add to cart</button>
                </div>
            </section>
        </section>
    )
}

const mapStateToProps = state => {
    return {state}
};

export default connect(mapStateToProps)(BookOverview);
