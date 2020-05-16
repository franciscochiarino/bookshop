const initialState = {
    books: [],
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {

    switch(action.type) {

        case 'FETCH_BOOKS':
            return {...state, fetching: true}
        
        case 'FETCH_BOOKS_REJECTED':
            return {...state, fetching: false, error: action.payload}

        case 'FETCH_BOOKS_FULFILLED':
            return {...state, 
                fetching: false,
                fetched: true,
                books: action.payload
            }
            
        default:
            return state
    }
}