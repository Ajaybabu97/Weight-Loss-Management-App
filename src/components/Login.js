// src/components/Login.js

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username and password match any existing user
        const user = existingUsers.find(user => user.username === username && user.password === password);

        if (user) {
            onLogin(user); // Call onLogin with the found user
        } else {
            alert("Invalid username or password. Please sign up first.");
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>


    );
};

export default Login;
