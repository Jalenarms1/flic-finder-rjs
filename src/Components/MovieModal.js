import React, { useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function MovieModal(props) {
    const [randomMovie, setRandomMovie] = useState({});
    
    // console.log(props.movies[Math.floor(Math.random() * props.movies.length)]);
    let randomTitle;

    // randomTitle = props.movies[Math.floor(Math.random() * props.movies.length)];

    

    async function getRandomMovie() {
        let url = 'https://api.watchmode.com/v1/list-titles/?apiKey=xeo8DxXfZkd5yyDTji0rGODvMnP60fcoGyarLSHn&types=movie'
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
      if(!props.show){
        getRandomMovie();
      }
    
    }, [props.show])

    return (
      props.show ? 
        <Modal className="fade" show={props.show} onHide={props.handleClose}>
            <Modal.Header className="bg-dark" closeButton closeVariant="white">
              <Modal.Title className="text-light">
                Next Watch
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              <div className="w-100 d-flex justify-content-center">
                <div className="card const-shadow m-1" style={{width: '22rem'}}>
                    <img src={randomMovie.Poster} className="card-img-top" alt="..." style={{height: '22rem'}}/>
                    <div className="card-body card-body-pos bg-dark">
                        <div className="wrap-movie-info text-light">
                          <h5 className="card-title">{randomMovie.Title}</h5>
                          <p className="card-text">Directed by: {randomMovie.Director}</p>
                          <p>{randomMovie.Plot}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                      <a className="btn btn-sm btn-outline-dark" href={`https://www.imdb.com/title/${randomMovie.imdbID}`} rel="noreferrer" target="_blank">View on IMDb</a>
                    </div>
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button variant="primary" onClick={getRandomMovie}>Redo</Button>
              <Button variant="secondary" onClick={props.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        :
        <div></div>
    )


}