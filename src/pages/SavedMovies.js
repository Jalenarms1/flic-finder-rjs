import React, {useEffect, useState} from "react";

import LikedMovies from "../Components/LikedMovies"
import Navbar from "../Components/Navbar";

const alreadyLiked = JSON.parse(localStorage.getItem('likedMovies')) || [];


export default function SavedMovies () {

    const [likedMovies, setMovies] = useState(alreadyLiked);
    console.log(likedMovies);

    useEffect(() => {
        setMovies(JSON.parse(localStorage.getItem('likedMovies')))
    }, [])

    return (
        <>
            <Navbar />
            <div className="movie-container pb-2">
                <LikedMovies likedMovies={likedMovies} />
            </div>
        </>
    )
}