import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'


function BookCard(props) {

    // TODO: This function is also written in BookOverview.js
    const addToCart = async () => {

        // Define order
        const order = {
            quantity: 1,
            book: props.id,
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
        <div className="bookCard">
            <img src={`http://localhost:3001/books/cover/${props.cover}`} height="276" alt={`${props.title} book cover`} />
            <section className="cardDescription">
                <h3>{props.title}</h3>
                <h4>by {props.author}</h4>
                <q>{props.quote}</q>
                <p className="cardPrice">${props.price}</p>
                <div className="cardBtn">
                    <button className="overviewBtn"><Link to={`/books/book/${props.id}`}>Overview</Link></button>
                    <button className="buyBtn" onClick={addToCart}>Add to cart</button>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {state}
};

export default connect (mapStateToProps)(BookCard);