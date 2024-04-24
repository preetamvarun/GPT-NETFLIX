// This video container should display a video running in the background

import React from "react";
import useTrailerData from "./hooks/useTrailerData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import '../styles/VideoContainer.css';
import { toggleVideoSound } from "../utils/nowPlayingMoviesSlice";
import { TMDB_FALL_BACK_IMAGE_URL } from "../utils/constants";


const VideoContainer = () => {

    useTrailerData();

    const trailerData = useSelector((store) => store?.nowPlayingMovies?.trailerData)

    const isMute = useSelector((store) => store?.nowPlayingMovies?.isMuted)

    const videoDetails = useSelector((store) => store?.nowPlayingMovies?.videoDetails);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(toggleVideoSound())
    }

    const iFrame = `https://www.youtube.com/embed/${trailerData?.key}?autoplay=1&controls=0&modestbranding=1&mute=${isMute ? '1' : '0'}&showinfo=0`;

    return (
        <div className="videoContainer">
            {trailerData ? <iframe
                src= {iFrame}
                title="YouTube video player"
                allowFullScreen>
            </iframe> : <img src= {TMDB_FALL_BACK_IMAGE_URL + videoDetails?.backdrop_path} alt="Img"/>}
            <span onClick={handleClick}>{isMute ? '🔇' : '🔊'}</span>
        </div>
    )
}

export default VideoContainer;