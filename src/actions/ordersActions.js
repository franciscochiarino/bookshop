export function getOrders() {
    return function(dispatch) {

        dispatch({ type: 'GET_ORDERS '});

        fetch('http://localhost:3001/orders')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'GET_ORDERS_FULFILLED',
                    payload: data.orders 
                })
            })
            .catch(err => {
                dispatch({ type: 'GET_ORDERS_REJECTED', payload: err})
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

        // Post order
        fetch('http://localhost:3001/orders', post)

            .then(postOrderRes => postOrderRes.json())
            .then(postOrderData => {
                console.log('res from post order:', postOrderData);
                // Set put request options
                let put = {
                    method: 'PUT',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({ $push: {orders: postOrderData.order._id}})
                };
                return put
            })
            // Start put request
            .then(put => fetch(`http://localhost:3001/users/${userId}`, put))
            .then(putUserRes => putUserRes.json())
            .then(putUserData => {
                dispatch({ type: 'POST_ORDER_AND_PUT_USER_FULFILLED' })
                console.log('res from put user:', putUserData);
            })
            .catch(err => {
                dispatch({ 
                    type: 'POST_ORDER_AND_PUT_USER_REJECTED',
                    payload: err
                })
            })
    }
}