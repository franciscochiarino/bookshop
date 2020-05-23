
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions/booksActions';


function App(props) {
    
    useEffect(() => {
        props.dispatch(getBooks())
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
