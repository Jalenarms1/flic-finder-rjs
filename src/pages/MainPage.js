import '../App.css';
import Movie from '../Components/Movie';
import Navbar from '../Components/Navbar';
import MovieModal from '../Components/MovieModal';
import {useState, useEffect} from 'react';



function MainPage() {
  const moviesFromStorage = JSON.parse(localStorage.getItem('likedMovies')) || [];

  const [searchInp, setSearchInp] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [show, setShow] = useState(false);
  const [genre, setGenre] = useState('none');
  const [movieTitles, setMovieTitles] = useState([]);
  const [likedMovies, setLikedMovies] = useState(moviesFromStorage); 



  console.log(genre);

  async function getMovies() {

    let url = 'https://api.watchmode.com/v1/list-titles/?apiKey=xeo8DxXfZkd5yyDTji0rGODvMnP60fcoGyarLSHn&types=movie'
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
        titleData.isLiked = false
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

  useEffect(() => {
    if(likedMovies.length > 0){
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies))
      setLikedMovies(likedMovies)
    }

  }, [likedMovies])

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem('likedMovies'));
    if(items){
      setLikedMovies(items)
    }
  }, [])

  const handleLikedMovie = (e) => {
    likedMovies.forEach(item => {
      if(item.imdbID === e.target.offsetParent.id){
        return;
      }
    })
    
    movieTitles.forEach(item => {
      if(item.imdbID === e.target.offsetParent.id){
        let movieObj = {
          title: item.Title,
          poster: item.Poster,
          director: item.Director,
          plot: item.Plot,
          actors: item.Actors,
          rating: item.Rating,
          imdbID: item.imdbID,
          isLiked: true
        }

        setLikedMovies(prevData => {
          return [...prevData, movieObj]
        })
      }
    })
    
  }

  // unlike movie
  const handleUnlikedMovie = (e) => {
    console.log('unliked func');
    movieTitles.forEach(title => {
      if(title.imdbID === e.target.offsetParent.id){
        title.isLiked = false
      }
    })

    // will make sure last movie getting removed is updated within local storage
    if(likedMovies.length === 1){
      localStorage.setItem('likedMovies', JSON.stringify([]));
      setLikedMovies([])
      return;
    }

    likedMovies.forEach(liked => {
      if(liked.imdbID === e.target.offsetParent.id){
        console.log("match", e.target.offsetParent.id);
        let newLikedList = likedMovies.filter(item => {
          return item.imdbID !== e.target.offsetParent.id
        })
        console.log(newLikedList);
        

        setLikedMovies(newLikedList)
      } 
    })

    
  }

  


  function handleShowMore(){
    setShowNext(prevState => {
      return !prevState
    })
  }

  function handleShowAll(){
    setShowAll(prevState => {
      return !prevState
    })
  }

  function handleShowLess() {
    setShowNext(prevState => {
      return !prevState
    })

    setShowAll(prevState => {
      return !prevState
    })
  }

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  function handleGenreChange(e){
    setGenre(e.target.value)
  }

  
  return (
    <div className='wrap-all'>
      <Navbar handleGenreChange={handleGenreChange} handleClose={handleClose} handleShow={handleShow} showModal={show} setSearchInp={setSearchInp} />
      <div className='movie-container pb-3'>
        <Movie likedMovies={likedMovies} handleLikedMovie={handleLikedMovie} handleUnlikedMovie={handleUnlikedMovie} movieTitles={movieTitles} genre={genre} handleShowMore={handleShowMore} handleShowAll={handleShowAll} handleShowLess={handleShowLess} searchInp={searchInp} showModal={show} showNext={showNext} showAll={showAll} />
      </div>
      <MovieModal genre={genre} movies={movieTitles} show={show} handleClose={handleClose} />

    </div>
  );
}

export default MainPage;
