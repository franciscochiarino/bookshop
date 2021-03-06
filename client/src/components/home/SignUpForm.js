import React from 'react';
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { postUserAndLogin } from '../../actions/userActions';
import { connect } from 'react-redux';
import { capitalize } from '../../validation';

function SignUpForm(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const alert = useAlert();

    const addUser = async e => {
        e.preventDefault();

        // Check if user is logded in
        const data = sessionStorage.getItem('user');
        if (data) {
            return alert.info('You are already logded in');
        }

        // Check password
        if (password.length <= 7) {
            alert.error('Password has to be at least 8 characters long.')
        } else {
            props.dispatch(postUserAndLogin(capitalize(firstName), capitalize(lastName), email, password));
            props.setSignUp(false);
        }
    }


    return (
        <section className="alert">
            <div className="closeAlert">
                <button className="closeAlertBtn" onClick={() => props.setSignUp(false)}>X</button>
            </div>
            <h3>Create New Account</h3>
            <form onSubmit={addUser}>
                <label htmlFor="firstName"></label>
                <input type="text" name="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                
                <label htmlFor="lastName"></label>
                <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                
                <label htmlFor="email"></label>
                <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                
                <label htmlFor="password"></label>
                <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="submit" className="btn">Create Account</button>
            </form>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(SignUpForm);