// src/components/AddWeight.js

import React, { useState } from 'react';


const AddWeight = ({ onAddWeight }) => {
    const [weight, setWeight] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get current date and time
        const currentDate = new Date();
        const timestamp = currentDate.toISOString(); // Format as ISO string

        // Call onAddWeight with weight and timestamp
        onAddWeight({ weight: parseFloat(weight), date: timestamp });
        
        setWeight(''); // Clear input field
        setSuccessMessage('Weight added successfully!'); // Set success message

        // Hide the success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add Your Weight</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-secondary">
                <div className="form-group ">
                    <label htmlFor="weightInput">Weight (in kg)</label>
                    <input 
                        type="number" 
                        step="0.1" 
                        id="weightInput"
                        className="form-control" 
                        value={weight} 
                        onChange={(e) => setWeight(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Add Weight</button>

                {/* Display success message if it exists */}
                {successMessage && (
                    <div className="alert alert-success mt-3">
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddWeight;
