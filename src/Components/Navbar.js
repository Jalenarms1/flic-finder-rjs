import React, { useState } from "react";
import Movie from "./Movie";
import Button from 'react-bootstrap/Button';
import MovieModal from "./MovieModal";

export default function Navbar (props) {
    // const [searchInp, setSearchInp] = useState('');
    // const [showNext, setShowNext] = useState(false);
    // const [showAll, setShowAll] = useState(false);
    // const [show, setShow] = useState(false);
    // const [genre, setGenre] = useState('none');
    // console.log(genre);


    // function handleShowMore(){
    //   setShowNext(prevState => {
    //     return !prevState
    //   })
    // }

    // function handleShowAll(){
    //   setShowAll(prevState => {
    //     return !prevState
    //   })
    // }

    // function handleShowLess() {
    //   setShowNext(prevState => {
    //     return !prevState
    //   })

    //   setShowAll(prevState => {
    //     return !prevState
    //   })
    // }

    // function handleShow() {
    //   setShow(true)
    // }

    // function handleClose() {
    //   setShow(false)
    // }

    // function handleGenreChange(e){
    //   setGenre(e.target.value)
    // }
    
    return (
        <div className="wrap-content">
          <div className='navbar navbar-expand-lg nav-bg d-flex justify-content-between'>
            <div className="wrap-left d-flex text-light">
              <input type="text" placeholder='Search for a title...' onChange={event => {props.setSearchInp(event.target.value)}}/>
              <p className="mx-3 mb-0">Filter by genre: </p>
              <select onChange={props.handleGenreChange} className="">
                <option value="none">Choose a genre</option>
                <option name="genre" value="Action">Action</option>
                <option name="genre" value="Comedy">Comedy</option>
                <option name="genre" value="Crime">Crime</option>
                <option name="genre" value="Thriller">Thriller</option>

              </select> 

            </div>
            <Button type="button" onClick={props.handleShow} className="btn-light rounded p-2">Test your luck</Button>
          </div>
          {/* <div className='movie-container pb-3'>
            <Movie genre={genre} handleShowMore={handleShowMore} handleShowAll={handleShowAll} handleShowLess={handleShowLess} searchInp={searchInp} showNext={showNext} showAll={showAll} />
          </div> */}
          {/* <MovieModal genre={genre} show={show} handleClose={handleClose} /> */}
          
        </div>
    )
}