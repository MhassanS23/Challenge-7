import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Navbars from './Navbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faPlayCircle, faStar, faStarAndCrescent
} from '@fortawesome/free-solid-svg-icons'


export default function Detail(){
    const navigate = useNavigate();
    let {id} = useParams();
    const [movies, setMovie] = useState([])
    let IMG_BASEURL = "https://image.tmdb.org/t/p/w500";

    const loadMovie = async () => {
        try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8c60b3b49802b54dd5f23e9f9e0d92b6`);
        setMovie(res.data)
        console.log(res)
        } catch (error) {
        console.error(error)
        }
    };

    useEffect(() => {
        loadMovie();
    }, [])

    const enter = (genres) => {
      navigate(`/genre/${genres}`)
    }

    return(
    <>
     <Navbars/>
    <div className="container-detail">
      <div className="detail-film">
        {movies &&
        <img
          className="picFilm"
          src={IMG_BASEURL+movies.backdrop_path}
        />
        }
      <div className="detail">
        <div className="title-film">
            <h1>{movies ? movies.title : ""}</h1>
        </div>
        <div className="movie-genre-container">
            {movies && movies.genres ? movies.genres.map(genre=>(
                <><span className="movie-genre" onClick={()=> enter(genre.id)}>{genre.name}</span></>
            )) : ""}
        </div>
        <div className="preview-film">
            <h4>{movies ? movies.overview : ""}</h4>
            <div></div>
        </div>
        <div className="rating-film">
            <span className="bintang"><FontAwesomeIcon icon={faStar} /></span>
            <p>{movies && movies.vote_average ? `${(movies.vote_average).toFixed(1)}/${Math.ceil(movies.vote_average)}` : ""}</p>
        </div>
        <button className="tombol-trailer"><FontAwesomeIcon icon={faPlayCircle} /> WATCH TRAILER</button>
      </div>
      </div>
    </div>

    </>
    )
}