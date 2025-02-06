// src/components/Navbar.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink
import PropTypes from 'prop-types'; // Optional: For prop type checking


const Navbar = ({ isLoggedIn, onLogout, username }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Weight Loss Management</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>Home</NavLink>
                        </li>
                        {!isLoggedIn && ( // Show Sign Up and Login if not logged in
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                        {isLoggedIn && ( // Show username and Logout button if logged in
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text me-2">Welcome, {username}!</span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={onLogout} className="btn btn-link nav-link">Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// Optional: Prop Types for better type checking
Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    username: PropTypes.string, // Add username as a prop
};

export default Navbar;
