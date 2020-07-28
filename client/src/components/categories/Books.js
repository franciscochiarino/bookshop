import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/booksActions';

function Books({ books, dispatch, match, addToCart, overview}) {
    const [loading, setLoading] = useState(books.fetching);

    useEffect(() => {
        setLoading(books.fetching)
    }, [books.fetching]);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(getBooks())
        }
    }, [books.length, dispatch])

    let currentBooks = [];

    switch(match.params.genre) {
        case 'favorites':
            currentBooks = books.filter(({favorite}) => favorite === true);
            break;
        case 'fiction':
            currentBooks = books.filter(({genre}) => genre === 'Fiction');
            break;
        case 'mystery':
            currentBooks = books.filter(({genre}) => genre === 'Mystery');
            break;
        case 'tech':
            currentBooks = books.filter(({genre}) => genre === 'Tech');
            break;
        case 'biography':
            currentBooks = books.filter(({genre}) => genre === 'Biography');
            break;
        default:
            return
    }

    const bookCards = currentBooks.map((book, i) => {
        return(
            <BookCard 
                key={i}
                id={book._id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                published={book.published}
                quote={book.quote}
                price={book.price}
                addToCart={addToCart}
                overview={overview}
            />
        )
    })

    return (
        <div>
            <section className="Books">
                { loading ? <div className="loading"></div> : null }
                {bookCards}
            </section>       
        </div>
    )
}

const mapStateToProps = state => {
    return {
        books: state.books.books,
        user: state.user.user
    }
};

export default connect(mapStateToProps)(Books);
