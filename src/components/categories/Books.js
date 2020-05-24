import React, { useEffect } from 'react';
import BookCard from './BookCard';
import {connect} from 'react-redux';
import { getBooks } from '../../actions/booksActions';

function Books(props) {

    useEffect(() => {
        console.log('[Books useEffect]')
        if (props.books.length === 0) {
            props.dispatch(getBooks())
        }
    }, [])

    const addToCart = () => {

    }

    let books = [];

    switch(props.match.params.genre) {
        case 'favorites':
            books = props.books.filter(({favorite}) => favorite === true);
            break;
        case 'fiction':
            books = props.books.filter(({genre}) => genre === 'Fiction');
            break;
        case 'mystery':
            books = props.books.filter(({genre}) => genre === 'Mystery');
            break;
        case 'tech':
            books = props.books.filter(({genre}) => genre === 'Tech');
            break;
        case 'biography':
            books = props.books.filter(({genre}) => genre === 'Biography');
            break;
        default:
            return
    }

    const bookCards = books.map((book, i) => {
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
            />
        )
    })

    return (
        <div>
            <section className="booksContainer">
                {bookCards}
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        books: state.books.books
    }
};

export default connect(mapStateToProps)(Books);
