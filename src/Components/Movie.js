import React, {useState, useEffect} from "react";
function Movie (props){
    const [movieTitles, setMovieTitles] = useState([]);
    console.log(movieTitles);

   

    async function getMovies() {

        let url = 'https://api.watchmode.com/v1/list-titles/?apiKey=CD5UU4BDUoZl8jOFkq3QEQ2iWo6d1MYOrGSDqIQ8&types=movie&limit=75'
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
        {movieTitles.slice(0,24).filter((item) => {
            if(props.searchInp === ""){
                return item
            } else if(item.Title.toLowerCase().includes(props.searchInp.toLowerCase())) {
                return item
            }
        }).map((item, index) => {
            return  (
            <div key={index} className="card card-flex card-shadow m-1" style={{width: '15rem'}}>
                <img src={item.Poster} className="card-img-top" alt="..." style={{height: '18rem'}}/>
                <div className="card-body card-body-pos bg-dark">
                    <div className="wrap-movie-info text-light">
                        <h5 className="card-title">{item.Title}</h5>
                        <p className="card-text">Directed by: {item.Director}</p>
                        
                    </div>
                    <a href="/" className="btn btn-primary">Sneak peek</a>
                </div>
            </div>
            )
        })}
        {props.showNext && movieTitles.slice(24,49).filter((item) => {
            if(props.searchInp === ""){
                return item
            } else if(item.Title.toLowerCase().includes(props.searchInp.toLowerCase())) {
                return item
            }
        }).map((item, index) => {
            return  (
            <div key={index} className="card card-flex card-shadow m-1" style={{width: '15rem'}}>
                <img src={item.Poster} className="card-img-top" alt="..." style={{height: '18rem'}}/>
                <div className="card-body card-body-pos bg-dark">
                    <div className="wrap-movie-info text-light">
                        <h5 className="card-title">{item.Title}</h5>
                        <p className="card-text">Directed by: {item.Director}</p>
                        
                    </div>
                    <a href="/" className="btn btn-primary">Sneak peek</a>
                </div>
            </div>
            )
        })}
        {props.showAll && movieTitles.slice(49).filter((item) => {
            if(props.searchInp === ""){
                return item
            } else if(item.Title.toLowerCase().includes(props.searchInp.toLowerCase())) {
                return item
            }
        }).map((item, index) => {
            return  (
            <div key={index} className="card card-flex card-shadow m-1" style={{width: '15rem'}}>
                <img src={item.Poster} className="card-img-top" alt="..." style={{height: '18rem'}}/>
                <div className="card-body card-body-pos bg-dark">
                    <div className="wrap-movie-info text-light">
                        <h5 className="card-title">{item.Title}</h5>
                        <p className="card-text">Directed by: {item.Director}</p>
                        
                    </div>
                    <a href="/" className="btn btn-primary">Sneak peek</a>
                </div>
            </div>
            )
        })}
        
        </>
    )
}

export default Movie;