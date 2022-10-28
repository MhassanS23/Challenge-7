import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Cards from './Card.jsx'
import {useParams} from 'react-router-dom'
import Navbars from './Navbar'
import logo from './back1.jpg'
import {useDispatch, useSelector} from 'react-redux'
import {fetchSearch} from '../features/movies/moviesSlice'


const Searchs = () => {
    const {name} = useParams()
    const search = useSelector(state=> state.movies.search)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchSearch(name));
    }, [dispatch]);

    return(
    <>
    <div className="search-header">
      <Navbars/>
      <img src={logo}/>
      <div className="tulisan-pojok-img">
        <h1>{`Search Result "${name.toUpperCase()}"`}</h1>
      </div>
    </div>
    <div className="tulisan-pojok">
    <h1>{`Search Result "${name.toUpperCase()}"`}</h1>
    </div>
    {search.length == 0 ? 
    <h3 className="notfound">FILM NYA GK ADA BANG</h3>
    : 
    <div className="containerHome">
     <div className="card-grid">
      {search.length > 0 && search.map(film =>{
        return<Cards movie = {film}/>
      })}
     </div>
    </div>}
    </>
    )
}

export default Searchs