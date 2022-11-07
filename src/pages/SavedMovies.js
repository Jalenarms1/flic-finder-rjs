import React, {useState} from "react";

import LikedMovies from "../Components/LikedMovies"

const alreadyLiked = JSON.parse(localStorage.getItem('likedMovies')) || [];


export default function SavedMovies () {

    const [likedMovies, setMovies] = useState(alreadyLiked);
    console.log(likedMovies);

    return (
        <>
            <div className="movie-container pb-2">
                <LikedMovies likedMovies={likedMovies} />
            </div>
        </>
    )
}