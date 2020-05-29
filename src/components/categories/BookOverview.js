import React, { useEffect, useState } from 'react'

export default function BookOverview(props) {

    const [book, setBook] = useState(null);

    useEffect(() => { 
        getBook(props.match.params.id)
    }, [])
    
    const getBook = (id) => {
        fetch(`http://localhost:3001/books/${id}`)
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
                        <button className="buyBtn" onClick={props.addToCart}>Add to cart</button>
                    </div>
                </section>
        </section>
    )
}