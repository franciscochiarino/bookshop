import React from 'react'
import {useState} from 'react';
import {connect} from 'react-redux';
import { login } from '../../actions/userActions';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = e => {
        e.preventDefault();
        props.dispatch(login(email, password));
        props.setLogin(false);
    }

    return (
        <section className="alert">

            <div className="closeAlert">
                <button className="closeAlertBtn" onClick={() => props.setLogin(false)}>X</button>
            </div>
            <h3>Log In</h3>
            <form onSubmit={userLogin}>
                
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
    return {
        user: state.user.user
    }
};

export default connect(mapStateToProps)(Login)