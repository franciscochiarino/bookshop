import React from 'react'
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async e => {
        e.preventDefault();
        
        // Data to be posted
        const user = {
            email,
            password
        };

        // HTTP options
        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        // Fetch data
        const response = await fetch('http://localhost:3001/users/login', options);
        const data = await response.json();

        // Save user id to session storage
        const userData = JSON.stringify(data.user.id);
        sessionStorage.setItem('user', userData);

        // Save user to state
        props.dispatch({
            type: 'STORE_USER',
            payload: data.user
        })

        // Close login window
        props.setLogin(false);
    }

    return (
        <section className="signUp">

            {/* {props.state.user.email ? <Redirect from="/" to="/users/user/" /> : null} */}

            <div className="closeSignUp">
                <button className="closeSignUpBtn" onClick={() => props.setLogin(false)}>X</button>
            </div>
            <h3>Log In</h3>
            <form onSubmit={login}>
                
                <label htmlFor="email"></label>
                <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                
                <label htmlFor="password"></label>
                <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="submit" className="btn">Submit</button>
            </form>
        </section>
    )
}

const mapStateToProps = state => {
    return {state}
};

export default connect(mapStateToProps)(Login)