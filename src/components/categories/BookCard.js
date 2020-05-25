import React from 'react';

export default function BookCard(props) {

    return (
        <div className="bookCard">
            <img src={`http://localhost:3001/books/cover/${props.cover}`} height="276" alt={`${props.title} book cover`} />
            <section className="cardDescription">
                <h3>{props.title}</h3>
                <h4>by {props.author}</h4>
                <q>{props.quote}</q>
                <p className="cardPrice">${props.price}</p>
                <div className="cardBtn">
                    <button className="overviewBtn" onClick={() => props.overview(props.id)}>Overview</button>
                    <button className="buyBtn" onClick={() => props.addToCart(props.id, props.title)}>Add to cart</button>
                </div>
            </section>
        </div>
    )
}
