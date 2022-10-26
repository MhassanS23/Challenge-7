import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () =>{
    try{
        const response = await axios.get("https://api.themoviedb.org/3/discover/movie?&api_key=8c60b3b49802b54dd5f23e9f9e0d92b6");
        return response.data
    } catch(error){
        console.log(error)
    }
})

export const fetchGenres = createAsyncThunk('genre/fetchGenres', async () =>{
    try{
        const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=8c60b3b49802b54dd5f23e9f9e0d92b6");
        return response.data
    } catch(error){
        console.log(error)
    }
})

export const fetchDetail = createAsyncThunk('detail/fetchDetail', async (id) =>{
    try{
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?&api_key=8c60b3b49802b54dd5f23e9f9e0d92b6&with_genres=${id}`);
        return response.data
    } catch(error){
        console.log(error)
    }
})


const initialState={
    movies: [],
    genre: [],
    detail: [],
    loading: true, 
    error: null
}

export const movSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers:{
        [fetchMovies.pending]: (state) => {
            state.loading = true
        },
        [fetchMovies.fulfilled]: (state, {payload}) => {
            state.movies = payload.results
            state.loading = false
        },
        [fetchMovies.rejected]: (state) => {
            state.loading = false
        },
        [fetchGenres.pending]: (state) => {
            state.loading = true
        },
        [fetchGenres.fulfilled]: (state, {payload}) => {
            state.genre = payload.genres
            state.loading = false
        },
        [fetchGenres.rejected]: (state) => {
            state.loading = false
        },
        [fetchDetail.pending]: (state) => {
            state.loading = true
        },
        [fetchDetail.fulfilled]: (state, {payload}) => {
            state.detail = payload.results
            state.loading = false
        },
        [fetchDetail.rejected]: (state) => {
            state.loading = false
        },
    },
});

export const moviesReducer = movSlice.reducer;