import React, {useEffect, useState} from "react";

import LikedMovies from "../Components/LikedMovies"
import Navbar from "../Components/Navbar";

const alreadyLiked = JSON.parse(localStorage.getItem('likedMovies')) || [];


export default function SavedMovies () {

    const [likedMovies, setLikedMovies] = useState(alreadyLiked);
    console.log(likedMovies);

    useEffect(() => {
        setLikedMovies(JSON.parse(localStorage.getItem('likedMovies')))
    }, [])

    useEffect(() => {
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    }, [likedMovies])

    return (
        <>
            <Navbar />
            <div className="movie-container pb-2">
                <LikedMovies likedMovies={likedMovies} setLikedMovies={setLikedMovies} />
            </div>
        </>
    )
}