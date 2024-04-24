import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetMovies from "./hooks/useGetMovies";
import VideoContainer from "./VideoContainer.js";
import VideoDetails from "./VideoDetails.js";
import Header from "./Header.js";
import MovieListContainer from "./MovieListContainer.js";
import { addPopularMovies, addMovies
,addTopRatedMovies, addUpcomingMovies, 
addPopularTvSeries, addAiringToday} from "../utils/nowPlayingMoviesSlice.js";
import { TMDB_GETMOVIES_API, TMDB_GETPOPULARMOVIES_API
,TMDB_TOPRATEDMOVIES_API, TMDB_UPCOMINGMOVIES_API , 
TMDB_POPULARTVSERIES_API, TMDB_AIRINGTODAY_API} from "../utils/constants.js";
import RecommendMovies from "./RecommendMovies.js";


const Browser = () => {

    const userInfo = useSelector((store) => store?.userInfo);

    const showRecommendationsPage = useSelector((store) => store?.recommendMovies?.showComponent);

    const nowPlayingMovies = useSelector((store) => store?.nowPlayingMovies)

    const navigate = useNavigate();
    
    /* If the user is not logged in, that means the redux store doens't contain the user object so,
    he should be redirected back to the sign in page*/
    useEffect(() => {
        if(!userInfo) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    /* If the user is logged in then now it's time to get the movies data.
    I am using the TMDB api. Use a custom hook to make browser component clean */
    /* add now playing movies to the store */
    useGetMovies(addMovies, TMDB_GETMOVIES_API, nowPlayingMovies?.movies);

    /* Add popular movies to the store */
    useGetMovies(addPopularMovies, TMDB_GETPOPULARMOVIES_API, nowPlayingMovies?.popularMovies);

    /* Add top rated movies to the store */
    useGetMovies(addTopRatedMovies, TMDB_TOPRATEDMOVIES_API, nowPlayingMovies?.topRatedMovies);

    /* Add upcoming movies info to the store */
    useGetMovies(addUpcomingMovies, TMDB_UPCOMINGMOVIES_API, nowPlayingMovies?.upComingMovies);


    /* Add popular tv series info to the store */
    useGetMovies(addPopularTvSeries, TMDB_POPULARTVSERIES_API, nowPlayingMovies?.popularTvSeries);

    /* Add airing today tv series info to the store */
    useGetMovies(addAiringToday, TMDB_AIRINGTODAY_API, nowPlayingMovies?.airingToday);


    /* Display the browse page only when the user is logged in. This means that we have userinfo in
    our redux store. */

    // If the user wants to go to the recommendations page render that component else render browse page component
    return userInfo &&  (
        <>
            {/* This is the primary container */}
            <div className="browseContainer">
                <Header/>
                {
                    showRecommendationsPage ? <RecommendMovies/> : 
                    <>
                        <VideoContainer/>
                        <VideoDetails/>
                    </>
                }
            </div>
            {/* This is the secondary container and show it when user is not in recommendations page */}
            {!showRecommendationsPage && 
            <div className="mainMovieCardContainer">
                <MovieListContainer/>
            </div>
            }
        </>
    )
}
export default Browser;