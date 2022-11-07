import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function Navbar (props) {

  console.log(window.location.pathname);
    
    
  return (
      <div className="wrap-content">
        <div className='navbar navbar-expand-lg nav-bg d-flex justify-content-between'>
          {window.location.pathname !== '#/saved-movies' ? <div className="wrap-left d-flex text-light">
            <input type="text" placeholder='Search for a title...' onChange={event => {props.setSearchInp(event.target.value)}}/>
            <p className="mx-3 mb-0">Filter by genre: </p>
            <select onChange={props.handleGenreChange} className="">
              <option value="none">Choose a genre</option>
              <option name="genre" value="Action">Action</option>
              <option name="genre" value="Comedy">Comedy</option>
              <option name="genre" value="Crime">Crime</option>
              <option name="genre" value="Thriller">Thriller</option>

            </select> 

          </div> :
          <div className="wrap-left d-flex text-light">
              <Button type="button" className="btn-light rounded p-2 px-3 mx-2"><Link to="/" style={{textDecoration: 'none', color: 'black'}}>Home</Link></Button>

            </div>}
          {window.location.pathname !== '#/saved-movies' && <div>
            <Button type="button" className="btn-light rounded p-2 mx-2"><Link to="/saved-movies" style={{textDecoration: 'none', color: 'black'}}>Saved Movies</Link></Button>
            <Button type="button" onClick={props.handleShow} className="btn-light rounded p-2">Test your luck</Button>

          </div>}
        </div>
        
      </div>
  )
}