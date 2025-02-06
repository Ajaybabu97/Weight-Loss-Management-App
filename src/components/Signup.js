// src/components/Signup.js

import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Store user data in localStorage
            const newUser = { username, password };
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            onSignup(newUser);
        } else {
            alert("Passwords do not match");
        }
    };

    return (

        <div className="container bg-secondary justify-content-center">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>


    );
};

export default Signup;
