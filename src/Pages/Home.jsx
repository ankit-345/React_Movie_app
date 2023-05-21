// api-key = e0f07f65034f8c88bb32a2133ece3b92
import React,{useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../components/MovieList';

const Home = () => {
  const [popular, setPopular] = useState([]);

  const fetchData = async () =>{
    let data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US');
    data = await data.json();
    setPopular(data.results);
  }

  useEffect(() =>{
      fetchData();
  }, []);

  return (
    <div className='carousel' style={{'marginBottom': '50px'}}>
    <Carousel 
    autoPlay={true}
    infiniteLoop={true}
    transitionTime={3}
    showStatus={false}
    showThumbs={false}
    >
      {
        popular.map((popularMovies)=>{
          return(
            <React.Fragment key={popularMovies.id}>
            <Link to={`movie/${popularMovies.id}`}><div className="carousel-movies">
              <img src={`https://image.tmdb.org/t/p/original/${popularMovies && popularMovies.backdrop_path}`} alt=''/>
             </div>
             <div className='carousel-text'>
                <h1>{popularMovies ? popularMovies.original_title: ""}</h1>
                <div className='date'>
                  <span>{popularMovies ? popularMovies.release_date: ""}</span>
                </div>
                <p>{popularMovies ? popularMovies.overview: ""}</p>
             </div>
             <div className='black-background'></div>
            </Link>
            </React.Fragment>
          )
        })
      }
    </Carousel>
    <MovieList />
  </div>  
  )
}

export default Home