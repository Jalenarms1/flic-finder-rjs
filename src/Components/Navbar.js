import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Navbar (props) {
    const [searchInp, setSearchInp] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [show, setShow] = useState(false);
    const [randomMovie, setRandomMovie] = useState({});
    console.log(randomMovie);

    async function getRandomMovie() {
      let url = 'https://api.watchmode.com/v1/list-titles/?apiKey=CD5UU4BDUoZl8jOFkq3QEQ2iWo6d1MYOrGSDqIQ8&types=movie'
      let response = await fetch(url, {
        method: 'GET'
      })
      let data = await response.json();
      console.log(data);
      let randomTitle = data.titles[Math.floor(Math.random() * data.titles.length)];

      let res = await fetch(`https://www.omdbapi.com/?i=${randomTitle.imdb_id}&apikey=4282aace`, {
        method: 'GET'
      })
      let titleData = await res.json();
      console.log(titleData);

      setRandomMovie(titleData);

    }
    useEffect(() => {
      if(!show){
        getRandomMovie();
      }
    }, [show])


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
      setShow(true)
    }

    function handleClose() {
      setShow(false)
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
          <Modal className="fade" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Next Watch
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100 d-flex justify-content-center">
                <div className="card card-shadow m-1" style={{width: '22rem'}}>
                    <img src={randomMovie.Poster} className="card-img-top" alt="..." style={{height: '22rem'}}/>
                    <div className="card-body card-body-pos bg-dark">
                        <div className="wrap-movie-info text-light">
                          <h5 className="card-title">{randomMovie.Title}</h5>
                          <p className="card-text">Directed by: {randomMovie.Director}</p>
                          <p>{randomMovie.Plot}</p>
                        </div>
                    </div>
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={getRandomMovie}>Redo</Button>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          
          
        </div>
    )
}