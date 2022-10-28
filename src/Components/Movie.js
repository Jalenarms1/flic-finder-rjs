import React, {useState, useEffect} from "react";
import MovieDetailModal from "./MovieDetailModal";



function Movie (props){
    const [movieTitles, setMovieTitles] = useState([]);
    console.log(movieTitles);
    


    let filteredMovies = movieTitles.filter(item => {
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
    
    async function getMovies() {

      let url = 'https://api.watchmode.com/v1/list-titles/?apiKey=CD5UU4BDUoZl8jOFkq3QEQ2iWo6d1MYOrGSDqIQ8&types=movie'
      let response = await fetch(url, {
        method: 'GET'
      })
      let data = await response.json();
      console.log(data);

      function getMovieDetails (data) {
        data.forEach(async (item) => {
          let res = await fetch(`https://www.omdbapi.com/?i=${item.imdb_id}&apikey=4282aace`, {
            method: 'GET'
          })
          let titleData = await res.json();
          if(titleData.Poster === 'N/A') {
            return;
          }
          setMovieTitles((prevData) => {
            return [...prevData, titleData]
          })
        })
      }
      getMovieDetails(data.titles)
    }
    useEffect(() => {
      getMovies();
    }, []);

    


    return (
        <>
        {finalList.map((item, index) => {
            return  (
            <>
            <div key={index} className="card bg-dark card-flex card-shadow m-1" style={{width: '15rem'}}>
              <img src={item.Poster} className="card-img-top" alt="..." style={{height: '18rem'}}/>
              <div className="card-body card-body-pos bg-dark">
                  <div className="wrap-movie-info text-light">
                      <h5 className="card-title">{item.Title}</h5>
                      <p className="card-text">Directed by: {item.Director}</p>
                      
                  </div>
              </div>
            <MovieDetailModal key={index} link={item.imdbID} title={item.Title} plot={item.Plot} rated={item.Rated} actors={item.Actors} />
            </div>
            </>
            )
        })}
        <div className="w-100 d-flex justify-content-center">
          {finalList.length > 23 && <button className="btn btn-outline-light rounded px-3 my-3" onClick={props.showAll === false ? (props.showNext === false ? props.handleShowMore : props.handleShowAll) : props.handleShowLess}>{props.showAll === false ? (props.showNext === false ? 'View more...' : 'View all') : 'View less'}</button>}
        </div>
        
        </>
    )
}

export default Movie;