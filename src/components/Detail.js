import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Navbars from './Navbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faPlayCircle, faStar, faStarAndCrescent
} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import {fetchDetailFilm} from '../features/movies/moviesSlice'


export default function Detail(){
    const navigate = useNavigate();
    let {id} = useParams();
    let IMG_BASEURL = "https://image.tmdb.org/t/p/w500";
    const detailfilms = useSelector(state=> state.movies.detailfilm)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchDetailFilm(id));
    }, [dispatch]);

    const enter = (genres) => {
      navigate(`/genre/${genres}`)
    }

    return(
    <>
     <Navbars/>
    <div className="container-detail">
      <div className="detail-film">
        {detailfilms &&
        <img
          className="picFilm"
          src={IMG_BASEURL+detailfilms.backdrop_path}
        />
        }
      <div className="detail">
        <div className="title-film">
            <h1>{detailfilms ? detailfilms.title : ""}</h1>
        </div>
        <div className="movie-genre-container">
            {detailfilms && detailfilms.genres ? detailfilms.genres.map(genre=>(
                <><span className="movie-genre" onClick={()=> enter(genre.id)}>{genre.name}</span></>
            )) : ""}
        </div>
        <div className="preview-film">
            <h4>{detailfilms ? detailfilms.overview : ""}</h4>
            <div></div>
        </div>
        <div className="rating-film">
            <span className="bintang"><FontAwesomeIcon icon={faStar} /></span>
            <p>{detailfilms && detailfilms.vote_average ? `${(detailfilms.vote_average).toFixed(1)}/${Math.ceil(detailfilms.vote_average)}` : ""}</p>
        </div>
        <button className="tombol-trailer"><FontAwesomeIcon icon={faPlayCircle} /> WATCH TRAILER</button>
      </div>
      </div>
    </div>

    </>
    )
}