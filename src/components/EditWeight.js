// src/components/EditWeight.js

import React, { useState } from 'react';

const EditWeight = ({ weightItem, onUpdate, onClose }) => {
    const [weight, setWeight] = useState(weightItem.weight);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...weightItem, weight });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Weight (in kg)</label>
                <input type="number" step="0.1" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Update Weight</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default EditWeight;
