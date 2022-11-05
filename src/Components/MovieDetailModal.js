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
            <Modal.Header className="bg-dark text-light" closeButton closeVariant="white">
                <h1>{props.title}</h1>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
                <h6>{props.plot}</h6>
                <div className="d-flex justify-content-between">
                    <p>Starring: {props.actors}</p>
                    <p>Rated: {props.rated}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <a className="btn btn-sm btn-outline-light" href={`https://www.imdb.com/title/${props.link}`} rel="noreferrer" target="_blank">View on IMDb</a>
            </Modal.Footer>
        </Modal>
    
        </>
    )
}