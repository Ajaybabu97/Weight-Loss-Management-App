// src/router.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AddWeight from './components/AddWeight';
import WeightList from './components/WeightList';
import Home from './components/Home'; // Import Home component

const RouterComponent = ({ user, onSignup, onLogin, onAddWeight, weights, onEdit, onDelete }) => {
    return (
        <Routes>
            <Route path="/" element={<Home user={user} />} /> {/* Pass user prop to Home */}
            {!user && (
                <>
                    <Route path="/signup" element={<Signup onSignup={onSignup} />} />
                    <Route path="/login" element={<Login onLogin={onLogin} />} />
                </>
            )}
            {user && (
                <>
                    <Route path="/add-weight" element={<AddWeight onAddWeight={onAddWeight} />} />
                    <Route path="/weight-list" element={<WeightList weights={weights} onEdit={onEdit} onDelete={onDelete} />} /> {/* Pass onEdit and onDelete */}
                </>
            )}
        </Routes>
    );
};

export default RouterComponent;
