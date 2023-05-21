// https://api.themoviedb.org/3/search/multi?api_key=e0f07f65034f8c88bb32a2133ece3b92&language=en-US&query=Avengers&page=1&include_adult=false
import React, { useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { myContext } from '../App';
import Select from 'react-select';

const Header = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isTypeHovered, setIsTypeHovered] = useState(false);
  const [isGenreHovered, setIsGenreHovered] = useState(false);
  const {searchText, setSearchText} = useContext(myContext);
   
  const options = [
    {label: 'Popular', value: 'movies/popular'},
    {label: 'Top Rated', value: 'movies/top_rated'},
    {label: 'Upcoming', value: 'movies/upcoming'}
  ]

  const genres = [
    {label: 'Action', value: 'genre/Action/28'},
    {label: 'Adventure', value: 'genre/Adventure/12'},
    {label: 'Animation', value: 'genre/Animation/16'},
    {label: 'Comedy', value: 'genre/Comedy/35'},
    {label: 'Crime', value: 'genre/Crime/80'},
    {label: 'Documentary', value: 'genre/Documentary/99'},
    {label: 'Drama', value: 'genre/Drama/18'},
    {label: 'Family', value: 'genre/Family/10751'},
    {label: 'Fantasy', value: 'genre/Fantasy/14'},
    {label: 'History', value: 'genre/History/36'},
    {label: 'Horror', value: 'genre/Horror/27'},
    {label: 'Music', value: 'genre/Music/10402'},
    {label: 'Mystery', value: 'genre/Mystery/9648'},
    {label: 'Romance', value: 'genre/Romance/10749'},
    {label: 'Science Fiction', value: 'genre/Science Fiction/878'},
    {label: 'TV Movie', value: 'genre/TV Movie/10770'},
    {label: 'Thriller', value: 'genre/Thriller/53'},
    {label: 'War', value: 'genre/War/10752'},
    {label: 'Western', value: 'genre/Western/37'},
  ]

  const handleDropdown = (selectedOption) =>{
    if(selectedOption){
      const {value} = selectedOption;
      navigate(value, {replace: true});
    }
  }

  const handleChange = (e) =>{
    setSearchText(e.target.value);
  }

  const handleOpenIcon = () =>{
      setIsOpen(!isOpen)
  }
   
  const handleTypeHovered = () =>{
    setIsTypeHovered(!isTypeHovered);
  }

  const handleGenreHovered = () =>{
    setIsGenreHovered(!isGenreHovered);
  }

  useEffect(() =>{
    if(searchText === ''){
      navigate('/');
    }else{
      navigate('/search');
    }
  }, [searchText]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 170,
      borderRadius: 8,
      border: '1px solid white',
      boxShadow: '0 0 8px rgba(1, 1, 1, 0.2)',
      backgroundColor: 'black',

      ':hover': {
        border: '1px solid white',
        cursor: 'pointer'
      }
    }),

    option: (provided, state) =>({
      ...provided,
      backgroundColor: state.isSelected ? 'grey' : 'black',
      color: 'white',
      width: 170,

      ':hover': {
        backgroundColor: 'grey',
      },
    }),

    singleValue: (provided) =>({
      ...provided,
      color: 'white',
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: 'black',
      width: 170,
      scrollbarWidth: 'thin',
      scrollbarColor: 'darkGrey grey',
    }),

    menuList: (provided) =>({
      ...provided,
      width: 170,
    }),
  
    dropdownIndicator: (provided) =>({
      ...provided,
      color: 'white',

      ':hover': {
        color: 'white'
      }
    })
  }

  return (
    <div className='header'>
      <Link to="/" className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="Logo" /></Link>
       <div className='header-left'>
           <Select 
           options={options}
           onChange={handleDropdown}
           defaultValue={options[0]}
           className='nav-links'
           isSearchable={false}
           styles={customStyles}
           />

           <Select  
           options={genres}
           onChange={handleDropdown}
           defaultValue={genres[0]}
           className='nav-links'
           isSearchable={false}
           styles={customStyles}
           />

           <Link to="/favourite" className='nav-links'>Favourites</Link>  
       </div>

       <div className='search_box'>
          <input type="text" placeholder='movies, shows and more' className='input' value={searchText} onChange={handleChange}/>
          <i className="fa-solid fa-magnifying-glass" style={{color: '#000000', cursor: 'pointer'}}></i>
       </div>

       <div className='nav-sidebar' onClick={handleOpenIcon}>
       <i class="fa-solid fa-bars"></i>
       </div>

       <div className={`nav-sidebar-content ${isOpen ? 'open' : ''}`}>
          <div className={`movie_type ${isTypeHovered ? 'hovered': ''}`}>
              <p className='nav-links' onClick={handleTypeHovered}>Movies Type</p>
              <div className='movie_type_content'>
                 {
                  options.map((option) =>(
                    <Link to={option.value} className='nav-links'>{option.label}</Link>
                  ))
                 }
              </div>
          </div>


          <div className={`movie_type ${isGenreHovered ? 'hovered': ''}`}>
              <p className='nav-links' onClick={handleGenreHovered}>Genre</p>
              <div className='movie_type_content'>
                 {
                  genres.map((genre) =>(
                    <Link to={genre.value} className='nav-links'>{genre.label}</Link>
                  ))
                 }
              </div>
          </div>
           <Link to="/favourite" className='nav-links'>Favourites</Link>  
       </div>

       <div className='sidebar-black-background'></div>
    </div>
  )
}

export default Header