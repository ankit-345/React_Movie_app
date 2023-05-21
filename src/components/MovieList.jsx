import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';

 
const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [total_pages, setTotal_pages] = useState(0);
  let {type} = useParams();

  const fetchData = async () =>{
     let data = await fetch(`https://api.themoviedb.org/3/movie/${type ? type : 'popular'}?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US&page=${page}`);
     data = await data.json();
     setMoviesList(data.results);
     setTotal_pages(data.total_pages);
  }

  useEffect(() =>{
    fetchData();
  }, []);

  useEffect(() =>{
    setPage(1);
    fetchData();
  }, [type])

  useEffect(() =>{
    fetchData();
    window.scrollTo(0, 0);
  }, [page]);

  const addMovies = (e, movie) =>{
    e.preventDefault();
    const oldMoviesList = JSON.parse(localStorage.getItem('Favourite')) || [];
      const newMoviesList = [...oldMoviesList, movie];
      localStorage.setItem('Favourite', JSON.stringify(newMoviesList));
  }
  
  const handlePageClick = (e) =>{
    let selectedPage = e.selected + 1;
    setPage(selectedPage);
  }

  return(
    <div className='movies-list'>
      <div className='title' style={{'marginTop': '30px'}}>
        {(type ? type: 'popular').toUpperCase()}
        </div>

      <div className='list'>   
      { MovieList ? 
        moviesList.map((movie)=>{
          return(
          <Card 
          movie = {movie} 
          type={type} 
          key={movie.id} 
          handleFavouriteClick={addMovies}
          />
          )
        }) :
        ""
      }
      </div>
      <div className='pagination_btn'>
        <p style={{color: 'lightgray', marginRight: '50px'}}>{page} of {total_pages}</p>
        <Pagination handlePageClick={handlePageClick} total_pages={total_pages} />
      </div>
    </div>
  )
}

export default MovieList