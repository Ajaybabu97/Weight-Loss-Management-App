// src/App.js

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RouterComponent from './router'; // Import the Router component

const App = () => {
    const [user, setUser] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        return savedUser || null;
    });

    const [weights, setWeights] = useState(() => {
        const savedWeights = JSON.parse(localStorage.getItem('weights'));
        return Array.isArray(savedWeights) ? savedWeights : []; // Ensure it's an array
    });

    // Effect to manage user state in local storage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Effect to manage weights state in local storage
    useEffect(() => {
        localStorage.setItem('weights', JSON.stringify(weights));
    }, [weights]);

    const handleSignup = (newUser) => {
        setUser(newUser);
        window.location.href = '/'; // Redirect to home after signup
    };

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        window.location.href = '/'; // Redirect to home after login
    };

    const handleLogout = () => {
        setUser(null);
        window.location.href = '/login'; // Redirect to login page after logout
    };

    const addWeight = (weightEntry) => {
        if (!user) return;

        const today = new Date();
        const dateString = today.toLocaleDateString();
        const timeString = today.toLocaleTimeString(); // Get current time as a string
        const userWeights = weights.filter(w => w.username === user.username); // Get weights for the logged-in user
        
        // Check if a weight entry for today already exists
        const existingEntryIndex = userWeights.findIndex(w => w.date === dateString);

        if (existingEntryIndex === -1) {
            // Add new weight entry with date and time
            setWeights(prevWeights => [
                ...prevWeights,
                { ...weightEntry, date: dateString, time: timeString, username: user.username } // Include date and time
            ]);
        } else {
            alert("You can only add one weight entry per day.");
        }
    };

    const editWeight = (updatedWeight) => {
        if (!user) return;

        setWeights(prevWeights => 
            prevWeights.map(w =>
                w.date === updatedWeight.date && w.username === user.username ? updatedWeight : w
            )
        );
    };

    const deleteWeight = (weightToDelete) => {
        if (!user) return;

        setWeights(prevWeights => 
            prevWeights.filter(w =>
                !(w.date === weightToDelete.date && w.weight === weightToDelete.weight && w.username === user.username)
            )
        );
    };

    return (
        <div>
            <Navbar 
                isLoggedIn={!!user} 
                onLogout={handleLogout} 
                username={user ? user.username : ''} 
            />
            <div className="container mt-4">
                <RouterComponent 
                    user={user} 
                    onSignup={handleSignup} 
                    onLogin={handleLogin} 
                    onAddWeight={addWeight}
                    weights={weights.filter(w => w.username === user?.username)} // Filter weights by username
                    onEdit={editWeight}
                    onDelete={deleteWeight}
                />
            </div>
        </div>
    );
};

export default App;
