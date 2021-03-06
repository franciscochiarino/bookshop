export function getOrders() {
    return function(dispatch) {

        dispatch({ type: 'GET_ORDERS '});

        fetch('/orders')
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

        // Options
        const post = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(order)
        };

        // Post order
        fetch('/orders', post)

            .then(postOrderRes => postOrderRes.json())
            .then(postOrderData => {
                // Set put request options
                let put = {
                    method: 'PUT',
                    headers: {'content-type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({ $push: {orders: postOrderData.order._id}})
                };
                return put
            })
            // Start put request
            .then(put => fetch(`/users/${userId}`, put))
            .then(putUserRes => putUserRes.json())
            .then(putUserData => {
                dispatch({ type: 'POST_ORDER_AND_PUT_USER_FULFILLED' })
            })
            .catch(err => {
                dispatch({ 
                    type: 'POST_ORDER_AND_PUT_USER_REJECTED',
                    payload: err
                })
            })
    }
}

export function updateOrderQuantity(orderId, orderQuantity) {
    return function(dispatch) {
        dispatch({ type: 'UPDATE_ORDER_QUANTITY'});
        orderQuantity = orderQuantity + 1;

        // Options
        const put = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ quantity: orderQuantity })
        }

        // Update
        fetch(`/orders/${orderId}`, put)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'UPDATE_ORDER_QUANTITY_FULFILLED' })
            })
            .catch(err => {
                dispatch({ type: 'UPDATE_ORDER_QUANTITY_REJECTED', payload: err })
            })
    }
}

export function deleteOrderAndPutUser(orderId, userId) {
    return function(dispatch) {
        dispatch({ type: 'DELETE_ORDER_AND_PUT_USER' })

        // Options
        const deleteOptions = {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
        }
        const putOptions = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ $pull: {orders: orderId} })
        }

        // Delete order
        fetch(`/orders/${orderId}`, deleteOptions)
            .then(deleteRes => deleteRes.json())
            .then(deleteData => {
            })
            // Put user
            .then(() => fetch(`/users/${userId}`, putOptions))
            .then(putRes => putRes.json())
            .then(putData => {
                dispatch({ type: 'DELETE_ORDER_AND_PUT_USER_FULFILLED'})
            })
            .catch(err => {
                dispatch({ type: 'DELETE_ORDER_AND_PUT_USER_REJECTED', payload: err })
            })
    }
}