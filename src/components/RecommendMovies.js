import React, { useState } from "react";
import { LANGUAGES } from "../utils/langaugeConstants";
import '../styles/RecommendMovies.css';
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { options } from "../utils/constants";
import { SearchByTitleQueryPart1, SearchByTitleQueryPart2 } from "../utils/constants";
import { recommendedMoviesInfo } from "../utils/recommendMoviesSlice";
import RecommendedSet from "./RecommendedSet";
import { v4 as uuidv4 } from 'uuid';
import { clearOutRecommendMovies } from "../utils/recommendMoviesSlice";
import BounceLoader from 'react-spinners/BounceLoader';
import { gptApi } from "../utils/gptApi";

const RecommendMovies = () => {
    const languageCode = useSelector((store) => store.languageInfo.languageCode);
    const recommendMovies = useSelector((store) => store.recommendMovies?.recommendMovies)

    // When user clicks the button, show him the spinner icon while we fetch the results 
    const [loading, setLoading] = useState(false);

    const inputMovieRef = useRef();

    const dispatch = useDispatch();

    // Handle this after you have developed the UI
    const getRecommendedMovieTitles = async (queryInput) => {

        const completeQuery = "Act as a movie recommendation system and suggest at max 15 movies for the query :" + queryInput + ". All these results should be comma(,) separated. Example output : James Bond, Titanic, Batman, Avatar, Spiderman"
        const response = await gptApi.chat.completions.create({
            messages: [{ role: 'user', content: completeQuery }],
            model: 'gpt-3.5-turbo',
          });

        return response?.choices[0]?.message?.content?.split(',');
    }

    const getMoviesInfo = async (movieTitle) => {
        const response = await fetch(SearchByTitleQueryPart1 + movieTitle + SearchByTitleQueryPart2, options);
        const data = await response?.json();
        return data?.results;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch(clearOutRecommendMovies());
        setLoading(true);
        const movieTitles = await getRecommendedMovieTitles(inputMovieRef.current.value)
        const result =  await Promise.all(movieTitles?.map((eachMovie) => getMoviesInfo(eachMovie)))
        setLoading(false)
        dispatch(recommendedMoviesInfo(result))
    }

    return (
        <div className="recommendMoviesContainer">
           <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder = {LANGUAGES[languageCode].placeholdertext} ref={inputMovieRef}/>
            <button onClick={handleClick}>{LANGUAGES[languageCode].searchtext}</button>
           </form>
           {
            loading ? <div style={{marginTop : "1rem", display : 'flex', justifyContent : "center"}}>
             <BounceLoader color= '#ff0000'/>
            </div> :  recommendMovies && (
                <div className="secondaryContainer">
                <p>{LANGUAGES[languageCode].header} 🍿🥤</p>
                {/* recommendMovies -> [ [{}], [{},{},{}], [{},{},{},{},{}], [{},{}],[{}]]*/}
                    {
                        recommendMovies.map((eachSet) => <RecommendedSet movieSet = {eachSet} key={uuidv4()}/>)
                    }
                </div>
            )
           }
        </div>
    )
}



export default RecommendMovies;