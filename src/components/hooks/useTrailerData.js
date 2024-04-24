import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TMDB_GETVIDEODATA_API,options } from "../../utils/constants";
import { addTrailerData } from "../../utils/nowPlayingMoviesSlice";

// Get one movie from the store

/*
    Now after you get the movie, you will see there is an id in the movie object.
    Now get another api from TMDB where you can get the video key based on this id.
    From that video key you can then embed an iframe
*/

const useTrailerData = () => {

    const trailerData = useSelector((store) => store?.nowPlayingMovies?.trailerData)

    const movies = useSelector((store) => store?.nowPlayingMovies?.movies)

    let movie = movies.length > 0 && movies[0];

    const dispatch = useDispatch();

    const getVideoData = async () => {

        const response = await fetch(TMDB_GETVIDEODATA_API+movie?.id+'/videos', options);
        const data = await response?.json();

        if(data?.results?.length > 0) {
            // Once you get the data select a particular object where the type is trailer
            const trailerData = data?.results?.filter((video) => video?.type === "Trailer")

            // If there are no trailers and add first video data from the data results
            const trailer = trailerData?.length > 0 ? trailerData[0] : data?.results[0];

            // disptach that information to the store
            dispatch(addTrailerData(trailer))
        }

    }

    useEffect(() => {
        /* Only make an api call if there is no trailer data */
        !trailerData && getVideoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movie, dispatch])

}

export default useTrailerData;