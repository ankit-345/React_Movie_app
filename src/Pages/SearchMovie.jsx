import React, { useState, useContext, useEffect } from 'react'
import { myContext } from '../App'
import Card from '../components/Card';
import debounce from 'lodash.debounce'

const SearchMovie = () => {
    const {searchText} = useContext(myContext);
    const [searchMovies, setSearchMovies] = useState([]);

    const fetchData = async () =>{
        let data = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US&query=${searchText}&page=1&include_adult=false`)
        data = await data.json();
        setSearchMovies(data.results);
    }

     const debouncedFetchData = debounce(fetchData, 1000);

    useEffect(() =>{
      debouncedFetchData();

      return () =>{
        debouncedFetchData.cancel();
      };

    }, [searchText]); 

    const addMovies = (e, movie) =>{
      e.preventDefault();
      const oldMoviesList = JSON.parse(localStorage.getItem('Favourite')) || [];
        const newMoviesList = [...oldMoviesList, movie];
        localStorage.setItem('Favourite', JSON.stringify(newMoviesList));
    }

  return (
    <div className='movies-list'>
    <div className='title'>Search Result: {searchText}</div>
    <div className='list'>   
    {
      searchMovies.map((movie)=>{
        return(
        <Card 
        movie={movie} 
        key={movie.id} 
        handleFavouriteClick={addMovies}
        />
        )
      })
    }
    </div>
  </div>
  )
}

export default SearchMovie
