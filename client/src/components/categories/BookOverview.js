import React, { useEffect, useState } from 'react'

export default function BookOverview({ match, addToCart }) {

    const [book, setBook] = useState(null);

    useEffect(() => { 
        getBook(match.params.id)
    }, [match])
    
    const getBook = (id) => {
        fetch(`/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data.book);
            })
    }  

    // This trick is golden
    if (!book) {return null}

    return (
        <section className="BookOverview">
                <div>
                <img src={`/books/cover/${book.cover}`} alt={`${book.title} book cover`}/>
                </div>
                <section className="overviewText">
                    <h2>{book.title}</h2>
                    <p className="author">by {book.author} - {book.published}</p>
                    <p className="reviewCount">★★★★★</p>
                    <p className="text">{book.overview}</p>
                    <p className="price">${book.price}</p>
                    <div className="mainBtn">
                        <button className="overviewBtn">Add to wish list</button>
                        <button className="buyBtn" onClick={() => addToCart(book._id, book.title)}>Add to cart</button>
                    </div>
                </section>
        </section>
    )
}