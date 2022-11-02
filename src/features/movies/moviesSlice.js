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

export const fetchDetailFilm = createAsyncThunk('detailfilm/fetchDetailFilm', async (id) =>{
    try{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8c60b3b49802b54dd5f23e9f9e0d92b6`);
        return response.data
    } catch(error){
        console.log(error)
    }
})

export const fetchSearch = createAsyncThunk('search/fetchSearch', async (param) =>{
    try{
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?&api_key=8c60b3b49802b54dd5f23e9f9e0d92b6&query=${param}`);
        return response.data
    } catch(error){
        console.log(error)
    }
})

export const googleLogin = createAsyncThunk('loginG/googleLogin', async (credentialResponse) =>{
    localStorage.setItem('token', JSON.stringify(credentialResponse.credential));
    localStorage.setItem('isLoggedin', true)
    localStorage.setItem('profile', "Google User");
})

export const loginUser = createAsyncThunk('login/loginUser', async (val) =>{
    try{
        const res = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users/login`, val)
        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        localStorage.setItem('isLoggedin', true)
        localStorage.setItem('profile', `${res.data.data.first_name} ${res.data.data.last_name}`)
    } catch(error){
        console.log(error)
    }
})

export const registerUser = createAsyncThunk('register/resgisterUser', async (val) =>{
    try{
        const res = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users`, val)
        localStorage.setItem('user', JSON.stringify(res.data.data));
    } catch(error){
        console.log(error)
    }
})


const initialState={
    movies: [],
    genre: [],
    detail: [],
    detailfilm: [],
    search: [],
    loginG: [],
    login: [],
    register: [],
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
        [fetchDetailFilm.pending]: (state) => {
            state.loading = true
        },
        [fetchDetailFilm.fulfilled]: (state, {payload}) => {
            state.detailfilm = payload
            state.loading = false
        },
        [fetchDetailFilm.rejected]: (state) => {
            state.loading = false
        },
        [fetchSearch.pending]: (state) => {
            state.loading = true
        },
        [fetchSearch.fulfilled]: (state, {payload}) => {
            state.search = payload.results
            state.loading = false
        },
        [fetchSearch.rejected]: (state) => {
            state.loading = false
        },
        [googleLogin.pending]: (state) => {
            state.loading = true
        },
        [googleLogin.fulfilled]: (state, {payload}) => {
            state.loginG = payload
            state.loading = false
        },
        [googleLogin.rejected]: (state) => {
            state.loading = false
        },
        [loginUser.pending]: (state) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            state.login = payload
            state.loading = false
        },
        [loginUser.rejected]: (state) => {
            state.loading = false
        },
        [registerUser.pending]: (state) => {
            state.loading = true
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            state.loading = false
            window.location.reload()
        },
        [registerUser.rejected]: (state) => {
            state.loading = false
        },
    },
});

export const moviesReducer = movSlice.reducer;