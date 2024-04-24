import React, { useState } from 'react';
import { TMDB_IMAGE_URL, TMDB_GETVIDEODATA_API, options } from '../utils/constants';
import formatDate from '../utils/formatter';

const MovieCard = ({data}) => {

  const {backdrop_path, release_date, title, vote_average, overview, id} = data;

  const [currentTrailerData, setCurrentTrailerData ] = useState(null)

  const getVideoData = async () => {

    const response = await fetch(TMDB_GETVIDEODATA_API+id+'/videos', options);
    const responseData = await response?.json();

    if(responseData?.results?.length > 0) {
        // Once you get the data select a particular object where the type is trailer
        const trailerData = responseData?.results?.filter((video) => video?.type === "Trailer")

        // If there are no trailers and add first video data from the data results
        const trailer = trailerData?.length > 0 ? trailerData[0] : responseData?.results[0];

        if(trailer) setCurrentTrailerData(trailer)
      }

  } 

  // Display the trailer when user hovers on the recommended movie card
  const handleMouseEnter = (e) => {
    e.preventDefault();
    getVideoData();
  }

  const handleMouseLeave = (e) => {
    e.preventDefault();
    setCurrentTrailerData(null);
  }

  const iFrame = `https://www.youtube.com/embed/${currentTrailerData?.key}?autoplay=1&controls=0&modestbranding=1&mute=0&showinfo=0`;


  return backdrop_path && (
    <div className='movieCard' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {
        (currentTrailerData) ? 
        <iframe style={{width : '100%', height : '300px'}}
                src= {iFrame}
                title="YouTube video player" 
                allowFullScreen>
          </iframe> : <img src= {TMDB_IMAGE_URL + backdrop_path} alt='img'/> 
      }
      <div className='movieCardDetails' >
        <p id = "title">{title}</p>
        <p style={{color : '#818181'}}>released on {formatDate(release_date)}</p>
        <div className='movieSummary'>
          <p>Summary</p>
          <p style={{color : "#9B9B9B"}}>{overview}</p>
        </div>
        <p>Vote Average : <span style={{color : '#FE4141', fontWeight : "400"}}>{vote_average}/10 </span></p>
      </div>
    </div>
  )
}

export default MovieCard;
