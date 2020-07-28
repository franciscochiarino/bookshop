const initialState = {
    user: {},
    fetching: false,
    fetched: false,
    error: null,
}

export default function reducer(state = initialState, action) {

    switch(action.type) {

        case 'LOGIN':
            return {...state, fetching: true}

        case 'LOGIN_REJECTED':
            return {...state, fetching: false, error: action.payload}

        case 'LOGIN_FULFILLED':
            return {...state, 
                fetching: false,
                fetched: true,
                user: action.payload    
            }

        case 'LOGOUT':
            return {...state, user: {}}

        case 'GET_USER':
            return {...state, fetching: true}

        case 'GET_USER_REJECTED':
            return {...state, fetching: false, error: action.payload}

        case 'GET_USER_FULFILLED':
            return {...state,
                fetching: false,
                fetched: true,
                user: action.payload
            }

        case 'POST_USER':
            return {...state, fetching: true}

        case 'POST_USER_REJECTED':
            return {...state, fetching: false, error: action.payload}

        case 'POST_USER_FULFILLED':
            return {...state,
                fetching: false,
                fetched: true,
                user: action.payload
            }

        case 'POST_USER_AND_LOGIN':
            return {...state, fetching: true}

        case 'POST_USER_AND_LOGIN_REJECTED':
            return {...state, fetching: false, error: action.payload}

        case 'POST_USER_AND_LOGIN_FULFILLED':
            return {...state,
                fetching: false,
                fetched: true,
                user: action.payload
            }
        case 'PUT_USER':
            return {...state, fetching: true}

        case 'PUT_USER_REJECTED':
            return {...state, fetching: false, error: action.payload}

        case 'PUT_USER_FULFILLED':
            return {...state,
                fetching: false,
                fetched: true,
                user: action.payload
            }

        default:
            return state
    }
}