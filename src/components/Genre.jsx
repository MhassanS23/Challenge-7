import React from 'react'
import Cards from './Card.jsx'
import Categories from './Category'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbars from './Navbar'
import logo from './back1.jpg'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchDetail} from '../features/movies/moviesSlice'




const Genres = () => {
  const {cat} = useParams()
  const details = useSelector(state=> state.movies.detail)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchDetail(cat));
  }, [dispatch]);

    return(
    <>
    <div className="search-header">
      <Navbars/>
      <img src={logo}/>
      <div className="tulisan-pojok-img">
        <h1>Genre</h1>
      </div>
    </div>
    <div className="tulisan-pojok">
    <h1>Genre</h1>
    </div>
      <div className="containerHome">
      <div className="card-grid">
        {details.map((mov)=>{
          return<Cards movie={mov}/>
        })}
      </div>
    </div>
    </>
    )
}

export default Genres

