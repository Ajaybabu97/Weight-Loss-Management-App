// src/components/WeightList.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditWeight from './EditWeight'; 
import DeleteConfirmationModal from './DeleteConfirmationModal'; 
import './styles.css'; // Adjust the path based on your project structure

const WeightList = ({ weights, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    const [showEdit, setShowEdit] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [weightToDelete, setWeightToDelete] = useState(null);

    // Date range filter states
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [weightLossResult, setWeightLossResult] = useState(null); // State for weight loss result

    // Filter weights by date range
    const filteredWeights = weights.filter(weightItem => {
        const weightDate = new Date(weightItem.date);
        return (!startDate || weightDate >= new Date(startDate)) && (!endDate || weightDate <= new Date(endDate));
    });

   // Pagination logic
   const totalPages = Math.ceil(filteredWeights.length / itemsPerPage);
   const indexOfLastWeight = currentPage * itemsPerPage;
   const indexOfFirstWeight = indexOfLastWeight - itemsPerPage;
   const currentWeights = filteredWeights.slice(indexOfFirstWeight, indexOfLastWeight);

   // Reset pagination when weights change
   useEffect(() => {
       setCurrentPage(1);
   }, [weights]);

   // Function to calculate weight loss between two dates
   const calculateWeightLoss = () => {
       if (!startDate || !endDate) {
           alert("Please select both start and end dates.");
           return;
       }

       // Filter weights within the date range
       const weightsInRange = weights.filter(weightItem => {
           const weightDate = new Date(weightItem.date);
           return weightDate >= new Date(startDate) && weightDate <= new Date(endDate);
       });

       if (weightsInRange.length === 0) {
           alert("No weight entries found in this date range.");
           return;
       }

       // Calculate weight loss
       const initialWeight = Math.min(...weightsInRange.map(w => w.weight));
       const finalWeight = Math.max(...weightsInRange.map(w => w.weight));
       const weightLoss = initialWeight - finalWeight;

       setWeightLossResult(weightLoss); // Set the result state
   };

   const handleEditClick = (weightItem) => {
       setSelectedWeight(weightItem); 
       setShowEdit(true); 
   };

   const handleUpdate = (updatedWeight) => {
       onEdit(updatedWeight); 
       closeEditModal(); 
   };

   const handleDeleteClick = (weightItem) => {
       setWeightToDelete(weightItem); 
       setShowDeleteModal(true); 
   };

   const handleDeleteConfirm = () => {
       onDelete(weightToDelete); 
       closeDeleteModal(); 
   };

   const closeEditModal = () => {
       setShowEdit(false);
       setSelectedWeight(null); 
   };

   const closeDeleteModal = () => {
       setShowDeleteModal(false);
       setWeightToDelete(null); 
   };

   return (
       <div className="card mb-4 border p-4 rounded shadow bg-secondary">
           <div className="card-body">
               <h5 className="card-title">Manage Your Weights</h5>
               
               {/* Date Range Filter */}
               <div className="form-group mb-4">
                   <label htmlFor="start-date">Start Date:</label>
                   <input 
                       id="start-date"
                       type="date" 
                       className="form-control mb-2" 
                       value={startDate} 
                       onChange={(e) => setStartDate(e.target.value)} 
                   />
                   <label htmlFor="end-date">End Date:</label>
                   <input 
                       id="end-date"
                       type="date" 
                       className="form-control mb-2" 
                       value={endDate} 
                       onChange={(e) => setEndDate(e.target.value)} 
                   />
               </div>

               <button className="btn btn-primary mb-3" onClick={calculateWeightLoss}>
                   Calculate Weight Loss
               </button>

               {weightLossResult !== null && (
                   <p>Estimated Weight Loss: {weightLossResult} kg</p>
               )}

               {currentWeights.length === 0 ? (
                   <p>No weights recorded.</p>
               ) : (
                <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Weight (kg)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentWeights.map((weightItem) => (
                        <tr key={`${weightItem.date}-${weightItem.weight}`}>
                            <td>{weightItem.date}</td>
                            <td>{weightItem.time}</td>
                            <td>{weightItem.weight} kg</td>
                            <td>
                                <button 
                                    onClick={() => handleEditClick(weightItem)} 
                                    className="btn btn-warning btn-sm"
                                    aria-label={`Edit weight entry for ${weightItem.date}`}>
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteClick(weightItem)} 
                                    className="btn btn-danger btn-sm ml-2"
                                    aria-label={`Delete weight entry for ${weightItem.date}`}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
               )}

               {/* Pagination Controls */}
               <div className="pagination mt-3">
                   <button 
                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                       disabled={currentPage === 1}
                       className="btn btn-secondary me-2"
                   >
                       Previous
                   </button>
                   <span> Page {currentPage} of {totalPages} </span>
                   <button 
                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                       disabled={currentPage === totalPages}
                       className="btn btn-secondary ms-2"
                   >
                       Next
                   </button>
               </div>

               {/* Modals */}
               {showEdit && (
                   <EditWeight 
                       weightItem={selectedWeight} 
                       onUpdate={handleUpdate} 
                       onClose={closeEditModal} 
                   />
               )}
               {showDeleteModal && (
                   <DeleteConfirmationModal 
                       show={showDeleteModal} 
                       onHide={closeDeleteModal} 
                       onDelete={handleDeleteConfirm} 
                   />
               )}
           </div>
       </div>
   );
};

// PropTypes for type checking
WeightList.propTypes = {
   weights: PropTypes.arrayOf(
       PropTypes.shape({
           date: PropTypes.string.isRequired,
           time: PropTypes.string.isRequired,
           weight: PropTypes.number.isRequired,
           username: PropTypes.string.isRequired,
       })
   ).isRequired,
   
   onEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
};

export default WeightList;
