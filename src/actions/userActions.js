export function login(e, email, password) {
    return function(dispatch) {
        e.preventDefault()
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

                // Close login window
            })
            .catch(err => {
                dispatch({ type: 'LOGIN_REJECTED', payload: err })
            })
            
    }
}