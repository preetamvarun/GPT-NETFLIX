import React from "react";
import { TMDB_IMAGE_URL } from "../utils/constants";
import '../styles/MovieListContainer.css';
import { addVideoDetails } from "../utils/nowPlayingMoviesSlice";
import { useDispatch } from "react-redux";
import { TMDB_GETVIDEODATA_API, options } from "../utils/constants";
import { addTrailerData } from "../utils/nowPlayingMoviesSlice";

const MovieList = ({data}) => {

    const dispatch = useDispatch();

    const updateTrailer = async () => {

        const response = await fetch(TMDB_GETVIDEODATA_API+data?.id+'/videos', options);
        const responseData = await response?.json();

        if(responseData?.results?.length > 0) {
            // Once you get the data select a particular object where the type is trailer
            const trailerData = responseData?.results?.filter((video) => video?.type === "Trailer")

            // If there are no trailers and add first video data from the data results
            const trailer = trailerData?.length > 0 ? trailerData[0] : responseData?.results[0];
            
            // disptach that information to the store
            dispatch(addTrailerData(trailer))
        }

        else {
            dispatch(addTrailerData(null))
        }
    }

    // When a user clicks on a particular movie card corresponding trailer and details should be shown
    const handleCardClick = (e) => {
        e.preventDefault();

        //update the trailer video in the background 
        updateTrailer();

        // Updating the video details like video title name and overview 
        dispatch(addVideoDetails(data));
    }

    // Only display the movie card if it has the image
    return data?.backdrop_path && (
            <div className="eachMovie" onClick={handleCardClick}>
                <img src= {TMDB_IMAGE_URL + data?.backdrop_path} alt="img"/>
            </div>
    )
}

export default MovieList;