const initialState = {
    orders: [],
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {

    switch(action.type) {

        case 'FETCH_ORDERS':
            return {...state, fetching: true}

        case 'FETCH_ORDERS_REJECTED':
            return {...state, fetching: false, error: action.payload}

        case 'FETCH_ORDERS_FULFILLED':
            return {...state,
                fetching: false,
                fetched: true,
                orders: action.payload
            }
        
        case 'POST_ORDER_AND_PUT_USER':
            return {...state, fetching: true}
        
        case 'POST_ORDER_AND_PUT_USER_REJECTED':
            return {...state, feching: false, error: action.payload}
        
        case 'POST_ORDER_AND_PUT_USER_FULFILLED':
            return {...state, 
                fetching: false,
                fetched: true,
            }

        default:
            return state
    }
}