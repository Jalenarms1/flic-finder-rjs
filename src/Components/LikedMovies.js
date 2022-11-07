import React, { useEffect, useState } from "react";
import MovieDetailModal from "./MovieDetailModal";


function LikedMovies(props) {
    

    return (
        <>
        {props.likedMovies && props.likedMovies.map((item, index) => {
            return  (
              <div key={index} id={item.imdbID} className="card bg-dark card-flex card-shadow m-1" style={{width: '15rem', boxShadow: '0 0 15px red'}}>
                <img src={item.poster} className="card-img-top" alt="..." style={{height: '18rem'}}/>
                <div className="card-body card-body-pos bg-dark">
                    <div className="wrap-movie-info text-light">
                        <h5 className="card-title">{item.titles}</h5>
                        <p className="card-text">Directed by: {item.director}</p>
                        
                    </div>
                </div>
                <MovieDetailModal key={index} link={item.imdbID} title={item.title} plot={item.plot} rated={item.rating} actors={item.actors} />
              </div>
            
            )
        })}
        </>
    )

}

export default LikedMovies;