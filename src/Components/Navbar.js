import { useState } from "react";
import Movie from "./Movie";

export default function Navbar (props) {
    const [searchInp, setSearchInp] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showAll, setShowAll] = useState(false);

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
    
    return (
        <div className="wrap-content">
          <div className='navbar navbar-expand-lg nav-bg d-flex justify-content-between'>
            <input type="text" placeholder='Search for a title...' onChange={event => {setSearchInp(event.target.value)}}/> 
            <button className="btn-light rounded p-2">Test your luck</button>
          </div>
          <div className='movie-container pb-3'>
            <Movie searchInp={searchInp} showNext={showNext} showAll={showAll} />
          </div>
          <div className="w-100 d-flex justify-content-center">
            {searchInp === '' && <button className="btn btn-outline-light rounded px-3 my-3" onClick={showAll === false ? (showNext === false ? handleShowMore : handleShowAll) : handleShowLess}>{showAll === false ? (showNext === false ? 'View more...' : 'View all') : 'View less'}</button>}
          </div>
        </div>
    )
}