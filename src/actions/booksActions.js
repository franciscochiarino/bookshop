export function fetchBooks() {
    return function(dispatch) {

        dispatch({ type: 'FETCH_BOOKS'})

        fetch('http://localhost:3001/books')
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'FETCH_BOOKS_FULFILLED', payload: data.books})
            })
            .catch(err => {
                dispatch({ type: 'FETCH_BOOKS_REJECTED', payload: err})
            })
    }
}
