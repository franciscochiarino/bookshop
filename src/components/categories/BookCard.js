import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard(props) {

    return (
        <div className="BookCard">
            <img src={`http://localhost:3001/books/cover/${props.cover}`} height="276" alt={`${props.title} book cover`} />
            <section className="cardDescription">
                <h3>{props.title}</h3>
                <h4>by {props.author}</h4>
                <q>{props.quote}</q>
                <p className="cardPrice">${props.price}</p>
                <div className="cardBtn">
                    <button className="overviewBtn"><Link to={`/books/book/${props.id}`}>Overview</Link></button>
                    <button className="buyBtn" onClick={() => props.addToCart(props.id, props.title)}>Add to cart</button>
                </div>
            </section>
        </div>
    )
}
