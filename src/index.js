import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Detail from './components/Detail.js'
import Searchs from './components/Search.jsx'
import Allmovies from './components/Allmovie.jsx'
import Genres from './components/Genre.jsx'
import {store} from './app/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/:id" element={<Detail/>}/>
          <Route path="/search/:name" element={<Searchs/>}/>
          <Route path="/all-movie" element={<Allmovies/>}/>
          <Route path="/genre/:cat" element={<Genres/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
