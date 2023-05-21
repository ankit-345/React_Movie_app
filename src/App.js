import React, { createContext, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import MovieList from './components/MovieList'
import Genre from './Pages/Genre'
import Home from './Pages/Home'
import Movie from './Pages/Movie'
import SearchMovie from './Pages/SearchMovie';
import ScrollToTop from './components/ScrollToTop';
import Favourite from './Pages/Favourite';

export const myContext = createContext();

const MyProvider = ({children}) =>{
  const [searchText, setSearchText] = useState('');

  return(
    <myContext.Provider value={{searchText, setSearchText}}>
       {children}
    </myContext.Provider>
  )
}

function App() {
  const Layout = () =>{

    return(
      <div className='container'>
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
              <MyProvider>
                <Layout />
              </MyProvider>
               ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/movie/:id',
          element: <Movie />
        },
        {
          path: '/movies/:type',
          element: <MovieList />
        },
        {
          path: '/genre/:type/:id',
          element: <Genre />
        },
        {
          path: '/search',
          element: <SearchMovie />
        },
        {
          path: '/favourite',
          element: <Favourite />
        },
        {
          path: "/*",
          element: <h2>Error Page</h2>
        }
      ]
    },
  ])
  return (
    <>
    <RouterProvider router = {router} />
    </>
  );
}

export default App;
