// src/components/Home.js

import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
    const navigate = useNavigate();

    const handleAddWeight = () => {
        navigate('/add-weight'); // Navigate to Add Weight page
    };

    const handleWeightList = () => {
        navigate('/weight-list'); // Navigate to Weight List page
    };

    return (
        <Container className="mt-5"> {/* Use Container to center content */}
            <Card className="text-center border p-4 rounded shadow bg-secondary">
                <Card.Body>
                    <Card.Title>Welcome to the Weight Loss Management Site!</Card.Title>
                    <Card.Text>
                        Track your weight loss journey easily and effectively.
                    </Card.Text>
                    {user ? ( // Check if user is logged in
                        <>
                            <Button variant="primary" onClick={handleAddWeight} className="me-2">
                                Add Weight
                            </Button>
                            <Button variant="primary" onClick={handleWeightList}>
                                View Weight List
                            </Button>
                        </>
                    ) : (
                        <p>Please log in to add your weight and view your weight list.</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
