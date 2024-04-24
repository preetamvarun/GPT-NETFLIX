import React from "react";
import { useSelector } from "react-redux";
import '../styles/VideoStyles.css';

const VideoDetails = () => {

    let movie = null;

    const videoDetails = useSelector((store) => store?.nowPlayingMovies?.videoDetails);

    const movies = useSelector((store) => store?.nowPlayingMovies?.movies)

    if(!videoDetails) movie = movies.length > 0 && movies[0];

    else movie = videoDetails;

    return movie && (
        <div className="videoDetails">
        {/* Tv series objects have an attribte name not title */}
            <p>{movie?.title ? movie?.title : movie?.name}</p>
            <p>{movie?.overview}</p>
            <div className="btns">
                <span className="play">Play</span>
                <span className="moreInfo">More Info</span>
            </div>
        </div>
    )
}

export default VideoDetails;