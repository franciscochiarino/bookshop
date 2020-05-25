import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/booksActions';
import { postOrderAndPutUser } from '../../actions/ordersActions';
import { Redirect, Route } from 'react-router-dom';
import BookOverview from './BookOverview';

function Books(props) {

    const [display, setDisplay] = useState('cards');

    useEffect(() => {
        console.log('[Books useEffect]')
        if (props.books.length === 0) {
            props.dispatch(getBooks())
        }
    }, [])

    useEffect(() => {
        setDisplay('cards')
    })

    // FIXME: Orders are added twice instead of incrementing the quantity
    
    const addToCart = (bookId, bookTitle) => {
        if (!props.user.id) {
            return alert('Please log in to purchase an item');
        }
        props.dispatch(postOrderAndPutUser(bookId, props.user.id))
        alert(`A copy of ${bookTitle} has been added to your cart.`)
    }

    const overview = (bookId) => {
        console.log('Book id:', bookId)
        setDisplay('overview')
        return (
            <BookOverview />
        )
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
                overview={overview}
            />
        )
    })

    return (
        <div>
            {display === 'cards' ?
                <section className="booksContainer">
                    {bookCards}
                </section>
            :
                <section>
                    <Redirect to="/books/book" />
                    <Route exact path='/books/book' render={ (props) => <BookOverview {...props} /> } />
                </section>
            }   
            
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
