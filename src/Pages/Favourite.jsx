import React, { useEffect, useState } from 'react'
import Card from '../components/Card';

const Favourite = () => {
  const [favMoviesList, setFavMoviesList] = useState([]);

  useEffect(() =>{
    const movies = JSON.parse(localStorage.getItem('Favourite')) || [];

    const uniqueMovies = movies.filter((val, index) =>{
      const movieIds = movies.map((val) => val.id);
      return movieIds.indexOf(val.id) === index;
    })
    setFavMoviesList(uniqueMovies);
  }, [])


  const removeMovies = (e, movie) =>{
      e.preventDefault();
      const removeMoviesList = JSON.parse(localStorage.getItem('Favourite')) || [];
      const removeOldMovieList = removeMoviesList.filter((item)=>( item.id !== movie.id));
      localStorage.setItem('Favourite', JSON.stringify(removeOldMovieList));
      setFavMoviesList(removeOldMovieList);
  }

  return (
    <div className='list'>
     {
      favMoviesList.length !== 0 ? 
      (
        favMoviesList.map((movie)=>{
          return(
          <Card 
          movie = {movie} 
          key={movie.id}
          handleFavouriteClick = {removeMovies}/>
          )
        })
      )
      : 
      <h2 style={{color: 'white', gridColumn: '2 /span 2', fontSize: '30px', textAlign: 'center'}}>No Favourite Movies Selected</h2>
     }
    </div>
  )
}

export default Favourite;