import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MovieDetailModal (props) {
    const [showDetails, setShowDetails] = useState(false)

    function handleShowDetails() {
        setShowDetails(true)
    }
    function hideDetails(){
        setShowDetails(false)
    }

    return (
        <>
        <Button className="bg-light text-dark" onClick={handleShowDetails}>See details...</Button>
        <Modal size="lg" centered show={showDetails} onHide={hideDetails}>
        <Modal.Header closeButton>
            <h1>{props.title}</h1>
        </Modal.Header>
        <Modal.Body>
            <h6>{props.plot}</h6>
            <p>Starring: {props.actors}</p>
        </Modal.Body>
        </Modal>
    
        </>
    )
}