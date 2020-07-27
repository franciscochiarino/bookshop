import React, { useState, useEffect } from 'react';
import { putUser } from '../../actions/userActions';
import { capitalize } from '../../validation';

export default function UserSettings({ user, dispatch }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
    }, [user.firstName, user.lastName, user.email])

    const editProfile = (e) => {
        e.preventDefault();

        // Put user
        dispatch(putUser(user.id, capitalize(firstName), capitalize(lastName), email))
    }

    return (
        <div className="UserSettings">

            <section className="editProfile">
                <h3 className="sectionHeading">Edit Profile</h3>

                <form className="editProfileForm" onSubmit={editProfile}>
                    <label htmlFor="firstName">First Name</label>
                        <input required type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />      

                    <label htmlFor="lastName">Last Name</label>
                        <input required type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                        <input required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                    <button type="submit">Submit</button>
                    
                </form>
        </section>
        </div>
    )
}
