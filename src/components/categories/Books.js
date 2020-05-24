import React from 'react';
import BookCard from './BookCard';
import {connect} from 'react-redux';

function Books(props) {

    let books = [];

    switch(props.match.params.genre) {
        case 'favorites':
            books = props.state.books.filter(({favorite}) => favorite === true);
            break;
        case 'fiction':
            books = props.state.books.filter(({genre}) => genre === 'Fiction');
            break;
        case 'mystery':
            books = props.state.books.filter(({genre}) => genre === 'Mystery');
            break;
        case 'tech':
            books = props.state.books.filter(({genre}) => genre === 'Tech');
            break;
        case 'biography':
            books = props.state.books.filter(({genre}) => genre === 'Biography');
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
    return {state}
};

export default connect(mapStateToProps)(Books);
