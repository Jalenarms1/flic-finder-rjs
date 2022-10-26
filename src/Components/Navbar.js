import React, { useState } from "react";
import Movie from "./Movie";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Navbar (props) {
    const [searchInp, setSearchInp] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [show, setShow] = useState(false);


    function handleShowMore(){
      setShowNext(prevState => {
        return !prevState
      })
    }

    function handleShowAll(){
      setShowAll(prevState => {
        return !prevState
      })
    }

    function handleShowLess() {
      setShowNext(prevState => {
        return !prevState
      })

      setShowAll(prevState => {
        return !prevState
      })
    }

    function handleShow() {
      setShow(prevState => {
        return !prevState
      })
    }
    
    return (
        <div className="wrap-content">
          <div className='navbar navbar-expand-lg nav-bg d-flex justify-content-between'>
            <input type="text" placeholder='Search for a title...' onChange={event => {setSearchInp(event.target.value)}}/> 
            <Button type="button" onClick={handleShow} className="btn-light rounded p-2">Test your luck</Button>
          </div>
          <div className='movie-container pb-3'>
            <Movie handleShowMore={handleShowMore} handleShowAll={handleShowAll} handleShowLess={handleShowLess} searchInp={searchInp} showNext={showNext} showAll={showAll} />
          </div>
          <Modal show={show}>
            <Modal.Header closeButton>
              <Modal.Title>
                Modal Header
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
            </Modal.Body>
          </Modal>
          
          
        </div>
    )
}