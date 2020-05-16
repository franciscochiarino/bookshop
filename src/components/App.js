
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { postOrderAndPutUser, getOrders } from '../actions/ordersActions';


function App(props) {
    
    useEffect(() => {

        props.dispatch(postOrderAndPutUser('5eb9a29b7eb43d3e8e7a9877', '5ebbca96e4600f46e6d68fc4'))
        props.dispatch(getOrders())

    }, [])

    return (
        <div className="App">
        <h1>My React App</h1>
        </div>
    );
}

const mapStateToProps = state => {
    return {state}
}

export default connect(mapStateToProps)(App)
