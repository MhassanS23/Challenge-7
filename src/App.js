import React from 'react'
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carouselfilms from './components/Carouselfilm.jsx'
import Navbars from './components/Navbar.jsx'
import Headers from './components/Header'
import Swipers from './components/Swiper'
import Categories from './components/Category'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {useDispatch, useSelector} from 'react-redux'
import {fetchMovies} from './features/movies/moviesSlice'

function App() {
  const movies = useSelector(state=> state.movies.movies)
  const loading = useSelector(state=> state.movies.loading)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchMovies());
  }, [dispatch]);
  const navigate = useNavigate();


  return (
    <div className="App">
    <GoogleOAuthProvider clientId="414434174427-nic0jjfbcvqaubflqajvvs5gedceip02.apps.googleusercontent.com">
    <Navbars/>
    <Carouselfilms/>
    <Headers/>
    {loading && <h1 className="movies">Loading....</h1>}
    {!loading && <Swipers movie={movies}/>}
    <Categories/>
    {/* <Categories movie={movie} setFiltered={setFiltered} activeGenre={activeGenre} setActivegenre={setActivegenre}/>
    <div className="containerHome">
      <div className="card-grid">
        {filtered.map((mov)=>{
          return<Cards movie={mov}/>
        })}
      </div>
    </div> */}
    {loading && <h1 className="movies">Loading....</h1>}
    {!loading && <Swipers movie={movies}/>}
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;
