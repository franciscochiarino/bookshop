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
        fetch('/users/login', options)
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

        fetch(`/users/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'GET_USER_FULFILLED', payload: data.user })
            })
            .catch(err => {
                dispatch({ type: 'GET_USER_REJECTED', payload: err})
            })
    }
}

export function postUserAndLogin(firstName, lastName, email, password) {
    return function(dispatch) {
        dispatch({ type: 'POST_USER'})
        // Data to be posted
        const user = { firstName, lastName, email, password };

        // HTTP options
        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        // Post request
        fetch('/users', options)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'POST_USER_FULFILLED', payload: data.user})
            })
            .then(() => {
                dispatch({ type: 'LOGIN' })

                // HTTP options
                const loginOptions = {
                    method: 'POST',
                    headers: { 
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                };

                // Login
                fetch('/users/login', loginOptions)
                    .then(loginRes => loginRes.json())
                    .then(loginData => {
                        dispatch({ type: 'LOGIN_FULFILLED', payload: loginData.user })

                        // Save user id to sessionStorage
                        const userId = JSON.stringify(loginData.user.id);
                        sessionStorage.setItem('user', userId);
                    })
                    // .catch(err => {
                    //     console.log(err)
                    //     dispatch({ type: 'LOGIN_REJECTED', payload: err })
                    // })
            })
            .catch(err => {
                dispatch({ type: 'POST_USER_REJECTED', payload: err})
            })  
    }
}

export function putUser( id, firstName, lastName, email) {
    return function(dispatch) {
        dispatch({ type: 'PUT_USER' })

        // Put options
        let put = {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ firstName, lastName, email })
        }

        // Send request
        fetch(`/users/${id}`, put)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'PUT_USER_FULFILLED', payload: data.user });
                console.log('res from put user:', data);
                window.location = '/#/users/user';
            })
            .catch(err => {
                dispatch({ type: 'PUT_USER_REJECTED', payload: err });
            })
    }
}