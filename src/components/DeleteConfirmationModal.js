// src/components/DeleteConfirmationModal.js

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onDelete }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this weight entry?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;
