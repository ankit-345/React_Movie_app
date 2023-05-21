import React,{useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"; 

const Card = ({movie, type, handleFavouriteClick}) => {
  const [isloading, setIsLoading] = useState(true);
  const [favourite, setFavourite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    setTimeout(() =>{
      setIsLoading(false);
    }, 1500);
  }, [])

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() =>{
      setIsLoading(false);
    }, 1500);
  
  }, [type])

  const handleFavourite = (e) =>{
   e.preventDefault();
   if(favourite){
    setFavourite(false);
   }else{
    setFavourite(true);
   }
  }

  const handleTouchStart = () =>{
    setIsHovered(true);
  }

  const handleTouchEnd = () =>{
    setIsHovered(false);
  }

  return (
    <>
    {
      isloading 
      ?
      <div className='card'>
          <SkeletonTheme baseColor='#202020' highlightColor='#444'>
            <Skeleton height={360} duration={2} />
          </SkeletonTheme>
      </div>
      : 
   <Link to={`/movie/${movie ? movie.id: ""}`}>
    <div className={`card ${isHovered ? 'hovered': ''}`} 
    onTouchStart={handleTouchStart} 
    onTouchEnd={handleTouchEnd}
    >
          <img src={`https://image.tmdb.org/t/p/original/${movie ? movie.poster_path: " "}`} alt="movie Poster" />
          <div className='card-text'>
             <h2 className='card-title'>{movie ? movie.original_title : ""}</h2>
             <div className='date-time'>
               <span>
               <span>{movie ? movie.vote_average : ""} <i className='fas fa-star'></i> </span>
               </span>
               <span className='fav_btn' onClick={(e) => handleFavouriteClick(e, movie)}>
               <i onClick={handleFavourite} className={`fa-${favourite ? 'solid' : 'regular'} fa-heart`} style={{color: favourite ? 'red' : 'white', marginRight: '11px'}}></i>
               </span>
             </div>
             <p className="card-desc">{movie ? movie.overview: ""}</p>
          </div>
          <div className="black-screen"></div>
    </div>
   </Link> 
  }
   </>
   )
}

export default Card