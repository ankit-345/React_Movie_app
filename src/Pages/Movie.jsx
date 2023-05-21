import React,{useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../components/Card';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"; 


const Movie = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieRecom, setMovieRecom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let {id} = useParams();

  const Honey = (id) =>{
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US&page=1`),
      setIsLoading(true)
     ])
     .then(([resMovieDetail, resMovieVideo, resMovieRecom]) =>
       Promise.all([resMovieDetail.json(), resMovieVideo.json(), resMovieRecom.json()]) 
     )
     .then(([dataMovie, dataVideo, dataRecom]) =>{
      setMovieDetail(dataMovie);
      dataVideo = dataVideo.results.filter((item) => item.type === 'Trailer').splice(0,1);
      setMovieVideo(dataVideo[0]);
      setMovieRecom(dataRecom.results);
      setIsLoading(false);
     })
   }

  useEffect(() => {
    Honey(id);
  }, [id])


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

  {
    console.log(movieRecom);
  }

  return (
    <div className='movie-container' >
       {  isLoading ?
          <SkeletonTheme baseColor='#202020' highlightColor='#444'>
          <Skeleton height={360} duration={2} />
          <Skeleton height={372} width={272} duration={2} />
        </SkeletonTheme>
        : 
        <div className='movie-poster'>
          <img src={`https://image.tmdb.org/t/p/original/${movieDetail ? movieDetail.backdrop_path : ""}`} alt=''/>
          <div className='movie-text'>
            <h2>{movieDetail ? movieDetail.original_title: ''}</h2>
            <p>{movieDetail ? movieDetail.tagline: ""}</p>
            <div className='votes'>
                <span style={{'marginRight': '15px'}}>{movieDetail ? movieDetail.vote_average: ""} <i className='fas fa-star'></i></span>
                <span>({movieDetail ? movieDetail.vote_count: ""}) votes</span>
            </div>
            <div className={{'marginTop': '10px'}}>{movieDetail ? movieDetail.runtime: ''} min</div>
            <div className={{'marginTop': '8px'}}>release-date: {movieDetail ? movieDetail.release_date: ''}</div>
            <div className='genres'>
              {movieDetail.genres 
              ?
                movieDetail.genres.map((genre, index) =>{
                  return(
                    <span key={index}>{genre.name}</span>
                  )
                })
                : ''
              }
            </div>
          </div>
          <div className='black-screen'></div>
          <div className='poster'>
            <img style={{'borderRadius': '10px'}}  src={`https://image.tmdb.org/t/p/original/${movieDetail ? movieDetail.poster_path : ""}`} alt="poster"/>
          </div>
        </div>
      }

    <div className='Synopsis'>
      <h3>Synopsis</h3>
      <p>{movieDetail ? movieDetail.overview : ''}</p>
    </div>
    
   

    <div className='Trailer'>
       <h3>Trailer</h3>
       <p className='Teaser_video'>
        { movieVideo ?
          <iframe width="100%" height="430px" style={{aspectRatio: '16/9'}} src={`https://www.youtube.com/embed/${movieVideo.key}`} title={movieVideo.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
         :
          <div style={{color: 'white'}}>No Trailer Available</div>
        }
      </p>
    </div>

      <div className='Recommendations'>
       <h3>Similar Movies</h3>
        <div className="recommend-scroll">
          <Carousel responsive={responsive}
          >
          { movieRecom ?
          movieRecom.map((movie)=>(
            <Card 
            movie={movie}
            key={movie.id}
            />
            ))
            : <div>No Movie Recommendation</div>
          } 
          </Carousel>
        </div>
    </div> 

    </div>
  )
}

export default Movie