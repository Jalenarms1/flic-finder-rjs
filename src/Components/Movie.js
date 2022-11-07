import React, {useState, useEffect} from "react";
import MovieDetailModal from "./MovieDetailModal";



function Movie (props){
    // const [movieTitles, setMovieTitles] = useState([]);
    // console.log(movieTitles);

    
    let filteredMovies = props.movieTitles.filter(item => {
      if(props.genre !== 'none'){
        if(props.searchInp === "" && item.Genre.includes(props.genre)){
          return item
        } else if(item.Genre.includes(props.genre) && item.Title.toLowerCase().includes(props.searchInp.toLowerCase())) {
          return item
        } 
      } else{
        if(props.searchInp === ""){
          return item
        } else if(item.Title.toLowerCase().includes(props.searchInp.toLowerCase())){
          return item
        }
      }
      
    })

    let finalList = filteredMovies.length > 49 ? (props.showAll === false ? (props.showNext === false ? filteredMovies.slice(0, 49) : filteredMovies.slice(0,100)) : filteredMovies) : filteredMovies;

    finalList.forEach(item => {
      props.likedMovies.forEach(likedItem => {
        if(item.imdbID === likedItem.imdbID){
          item.isLiked = true;
        }
      })
    })
    console.log(finalList);

    

    


    return (
        <>
        {finalList.map((item, index) => {
            return  (
              <div key={index} onClick={props.handleLikedMovie} id={item.imdbID} className="card bg-dark card-flex card-shadow m-1" style={{width: '15rem', border: item.isLiked ? "2px solid red" : ''}}>
                <img src={item.Poster} className="card-img-top" alt="..." style={{height: '18rem'}}/>
                <div className="card-body card-body-pos bg-dark">
                    <div className="wrap-movie-info text-light">
                        <h5 className="card-title">{item.Title}</h5>
                        <p className="card-text">Directed by: {item.Director}</p>
                        
                    </div>
                </div>
                <MovieDetailModal key={index} link={item.imdbID} title={item.Title} plot={item.Plot} rated={item.Rated} actors={item.Actors} />
              </div>
            
            )
        })}
        <div className="w-100 d-flex justify-content-center">
          {finalList.length > 23 && <button className="btn btn-outline-light rounded px-3 my-3" onClick={props.showAll === false ? (props.showNext === false ? props.handleShowMore : props.handleShowAll) : props.handleShowLess}>{props.showAll === false ? (props.showNext === false ? 'View more...' : 'View all') : 'View less'}</button>}
        </div>
        
        </>
    )
}

export default Movie;