import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/MovieListContainer.css';
import { movieTypes } from '../utils/constants';
import MovieSet from './MovieSet';

const MovieListContainer = () => {

  const nowPlayingMovies = useSelector((store) => store?.nowPlayingMovies?.movies);
  const popularMovies = useSelector((store) => store?.nowPlayingMovies?.popularMovies);
  const topRatedMovies = useSelector((store) => store?.nowPlayingMovies?.topRatedMovies);
  const upComingMovies = useSelector((store) => store?.nowPlayingMovies?.upComingMovies);
  const popularTvSeries = useSelector((store) => store?.nowPlayingMovies?.popularTvSeries);
  const airingToday = useSelector((store) => store?.nowPlayingMovies?.airingToday);

  return (
      <div className='movieListContainer'>
      {
        movieTypes.map((eachMovieType) => {
          switch (eachMovieType) {
            case "Now Playing On Netflix":
              return <MovieSet data= {nowPlayingMovies} title = {eachMovieType} key={eachMovieType}/>
            case "Popular On Netflix":
              return <MovieSet data= {popularMovies} title = {eachMovieType} key={eachMovieType}/>
            case "Top Rated Movies On Netflix":
              return <MovieSet data= {topRatedMovies} title = {eachMovieType} key={eachMovieType}/>
            case "Up Coming Movies On Netflix":
              return <MovieSet data= {upComingMovies} title = {eachMovieType} key={eachMovieType}/>
            case 'Popular TV Series On Netflix':
              return <MovieSet data = {popularTvSeries} title = {eachMovieType} key={eachMovieType}/>
            case 'Airing Today On Netflix':
              return <MovieSet data = {airingToday} title = {eachMovieType} key={eachMovieType}/>
            default : 
              return null;
          }
        })
      }
      </div>
  )
}

export default MovieListContainer;