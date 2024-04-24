import React from 'react';
import MovieList from './MovieList';
import '../styles/MovieListContainer.css';

const MovieSet = ({data, title}) => {
  return (
    <div className='movies' id= {title === "Now Playing On Netflix" ? "nowPlaying" : undefined}>
        <p style={{marginBottom : '.5rem'}}>{title}</p>
        <div className='movieSet'>
            {
                data?.map((eachMovie) => <MovieList data={eachMovie} key={eachMovie?.id}/>)
            }
        </div>
    </div>
  )
}

export default MovieSet;
