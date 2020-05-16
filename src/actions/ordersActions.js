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
    return async function(dispatch) {

        dispatch({ type: 'POST_ORDER_AND_PUT_USER' });

        // Define order
        const order = { quantity: 1, book: bookId };

        // Set post request options
        const post = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(order)
        };

        const postOrderRes = await fetch('http://localhost:3001/orders', post);
        const postOrderData = await postOrderRes.json();
        console.log('res from post order:', postOrderData);

        // Set put request options
        let put = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ push: {orders: postOrderData.order._id}})
        };

        const putUserRes = await fetch(`http://localhost:3001/users/${userId}`, put);
        const putUserData = await putUserRes.json();
        console.log('res from put user:', putUserData);
    }
}