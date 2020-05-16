export function fetchOrders() {
    return function(dispatch) {

        dispatch({ type: 'FETCH_ORDERS '});

        fetch('http://localhost:3001/orders')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'FETCH_ORDERS_FULFILLED',
                    payload: data.orders 
                })
            })
            .catch(err => {
                dispatch({ type: 'FETCH_ORDERS_REJECTED', payload: err})
            })
    }
}

export function postOrderAndPutUser(bookId, userId) {
    return function(dispatch) {

        dispatch({ type: 'POST_ORDER_AND_PUT_USER' });

        // Define order
        const order = { quantity: 1, book: bookId };

        // Set post request options
        const post = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(order)
        };

        // Set put request options
        let put = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: null
        };

        // Post order
        fetch('http://localhost:3001/orders', post)
            .then(res => res.json())
            // TODO: definir body directamente en la linea 44
            .then(data => {
                put.body = JSON.stringify({$push: {orders:data.order._id}})
                console.log('res from post order:', data)
                console.log('put options:', put)
            })
            .catch(err => {
                dispatch({ type: 'POST_ORDER_AND_PUT_USER_REJECTED', payload: err })
            })

        // Put user
        fetch(`http://localhost:3001/users/${userId}`, put)
            .then(res => res.json())
            .then(userData => {
                console.log('res from put user:', userData)
                dispatch({ type: 'POST_ORDER_AND_PUT_USER_FULFILLED' })
            })
            .catch(err => {
                dispatch({ type: 'POST_ORDER_AND_PUT_USER_REJECTED', payload: err })
            })
    }
}