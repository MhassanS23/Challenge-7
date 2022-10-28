import React from 'react'
import Cards from './Card.jsx'
import Navbars from './Navbar.jsx'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import logo from './back1.jpg'
import {useDispatch, useSelector} from 'react-redux'
import {fetchMovies} from '../features/movies/moviesSlice'


const Allmovies = () => {
  const movies = useSelector(state=> state.movies.movies)
  const loading = useSelector(state=> state.movies.loading)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchMovies());
  }, [dispatch]);
    
    return(
    <>
    <div className="search-header">
      <Navbars/>
      <img src={logo}/>
      <div className="tulisan-pojok-img">
        <h1>ALL MOVIES</h1>
      </div>
    </div>

    <div className="tulisan-pojok">
        <h1>All Movies</h1>
    </div>
    {loading && <h1 className="movies">Loading....</h1>}
    {!loading && 
    <div className="containerHome">
      <div className="card-grid">
    {movies.length > 0 && movies.map(film =>{
        return<Cards movie = {film} />
    })}
    </div>
      </div>
    }
    </>
    )
}

export default Allmovies