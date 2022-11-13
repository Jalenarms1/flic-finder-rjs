import React, { useEffect, useState } from "react";
import MovieDetailModal from "./MovieDetailModal";
import removeBtn from "../images/removeBtn.png";


function LikedMovies(props) {

    const removeLiked = (e) => {
        console.log(e);
        // will make sure last movie getting removed is updated within local storage
        if(props.likedMovies.length === 1){
            localStorage.setItem('likedMovies', JSON.stringify([]));
            props.setLikedMovies([])
            return;
        }

        if(e.target.id === "removeBtn"){
            console.log("hit");
            props.likedMovies.forEach(liked => {
                if(liked.imdbID === e.target.parentElement.parentElement.id){
                    props.setLikedMovies(props.likedMovies.filter(item => {
                        return item.imdbID !== e.target.parentElement.parentElement.id
                    }))
                } 
            })

        }else{
            props.likedMovies.forEach(liked => {
                if(liked.imdbID === e.target.parentElement.id){
                    props.setLikedMovies(props.likedMovies.filter(item => {
                        return item.imdbID !== e.target.parentElement.id
                    }))
                } 
            })

        }
       
    }
    

    return (
        <>
        {props.likedMovies && props.likedMovies.map((item, index) => {
            return  (
              <div key={index} id={item.imdbID} onClick={removeLiked} className="card bg-dark card-flex card-shadow m-1" style={{width: '15rem'}}>
                <img src={item.poster} className="card-img-top card-img-hover" alt="..." style={{height: '18rem'}}/>
                <div className="card-body card-body-pos bg-dark">
                    {item.isLiked && <img src={removeBtn} id="removeBtn" onClick={removeLiked} alt="not-liked" style={{width: '4rem', cursor: 'pointer'}} className="like-btn" />}

                    <div className="wrap-movie-info text-light">
                        <h5 className="card-title">{item.title}</h5>
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