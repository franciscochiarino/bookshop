import React from 'react'
import {useState} from 'react';

export default function(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const addUser = async e => {
        e.preventDefault();
        
        // Define request body
        const user = {
            firstName,
            lastName,
            email,
            password
        };

        // Set options
        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        const response = await fetch('http://localhost:3001/users', options);
        const data = await response.json();
        console.log('Response from SignUpForm:', data);
        props.setSignUp(false);

    }

    return (
        <section className="signUp">
            <div className="closeSignUp">
                <button className="closeSignUpBtn" onClick={() => props.setSignUp(false)}>X</button>
            </div>
            <h3>Create New Account</h3>
            <form onSubmit={addUser}>
                <label htmlFor="firstName"></label>
                <input type="text" name="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                
                <label htmlFor="lastName"></label>
                <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                
                <label htmlFor="email"></label>
                <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                
                <label htmlFor="password"></label>
                <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="submit" className="btn">Create Account</button>
            </form>
        </section>
    )
}
