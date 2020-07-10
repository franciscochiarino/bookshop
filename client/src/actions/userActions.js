export function login(email, password) {
    return function(dispatch) {
        dispatch({ type: 'LOGIN' })

        // Data to be posted
        const user = { email, password };

        // HTTP options
        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        // Post request
        fetch('http://localhost:3001/users/login', options)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'LOGIN_FULFILLED', payload: data.user })

                // Save user id to sessionStorage
                const userId = JSON.stringify(data.user.id);
                sessionStorage.setItem('user', userId);
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: 'LOGIN_REJECTED', payload: err })
            })
            
    }
}

export function getUser(id) {
    return function(dispatch) {
        dispatch({ type: 'GET_USER'})

        fetch(`http://localhost:3001/users/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'GET_USER_FULFILLED', payload: data.user })
            })
            .catch(err => {
                dispatch({ type: 'GET_USER_REJECTED', payload: err})
            })
    }
}

export function postUser(firstName, lastName, email, password) {
    return function(dispatch) {
        dispatch({ type: 'POST_USER'})

        // Data to be posted
        const user = { firstName, lastName, email, password};

        // HTTP options
        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        // Post request
        fetch('http://localhost:3001/users', options)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'POST_USER_FULFILLED', payload: data.user})

                // Save user id to sessionStorage
                const userId = JSON.stringify(data.user.id);
                sessionStorage.setItem('user', userId);
            })
            .catch(err => {
                dispatch({ type: 'POST_USER_REJECTED', payload: err})
            })  
    }
}