import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {useDispatch, useSelector} from 'react-redux'
import {fetchGenres} from '../features/movies/moviesSlice'



const Categories = () => {
  const navigate = useNavigate();
  const genre = useSelector(state=> state.movies.genre)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchGenres());
  }, [dispatch]);
  
  const enter = (genres) => {
      navigate(`/genre/${genres}`)
  }
    
    return(
    <>
    <div className="header-listMovie">
            <div className="navbars">
                <div className="category-movie">
                    <h2>Browse by Category</h2>
                </div>
                <div className="allMovie">
                    <Link to='/all-movie' className="link-allMovie" >See All Movie</Link>
                </div>
            </div>
    </div>
    <div className="container-category">
    <Swiper
      slidesPerView={8}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      key={genre.id}
    >
      {genre.length > 0 && genre.map(list =>{
          return<SwiperSlide ><button className="btn-category"
          onClick={()=> enter(list.id)}>{list.name}</button></SwiperSlide>
      })}
    </Swiper>
    </div>
    </>
    )
}

export default Categories

