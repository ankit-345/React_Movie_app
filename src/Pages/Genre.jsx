import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

const Genre = () =>{
    const [genreMovies, setgenreMovies] = useState([]);
    const [page, setPage] = useState(1)
    const [total_pages, setTotal_pages] = useState(0);
    let location = useLocation();
    const genreId = location.pathname.split('/')[3];
    const genreName = location.pathname.split('/')[2];

    const fetchData = async () =>{
       let data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_monetization_types=flatrate`);
       
       data = await data.json();
       setTotal_pages(data.total_pages);
       setgenreMovies(data.results);
    }

   const handlePageClick = (e) =>{
    let selectedPage = e.selected + 1;
    setPage(selectedPage);
   }

   useEffect(() =>{
    window.scrollTo(0, 0);
   }, [page])

    useEffect(() =>{
       fetchData();
    }, [location, page]);

    return(
        <>
        <h2 className='title' style={{'marginTop': '30px'}}>{genreName.toUpperCase()}</h2>
        <div className='list'>
            {
                genreMovies.map((movie)=>(
                    <Card movie={movie} key={movie.id} />
                ))
            }
        </div>
        <div className='pagination_btn'>
        <p style={{color: 'lightgray', marginRight: '50px'}}>{page} of {total_pages}</p>
        <Pagination handlePageClick={handlePageClick} total_pages={total_pages} />
      </div>
        </>
    )
}

export default Genre;