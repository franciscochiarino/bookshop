export function getBooks() {
    return function(dispatch) {

        dispatch({ type: 'GET_BOOKS'})

        fetch('http://localhost:3001/books')
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'GET_BOOKS_FULFILLED', payload: data.books})
            })
            .catch(err => {
                dispatch({ type: 'GET_BOOKS_REJECTED', payload: err})
            })
    }
}
