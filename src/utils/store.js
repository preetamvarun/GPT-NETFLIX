import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";
import nowPlayingMoviesSlice from "./nowPlayingMoviesSlice";
import recommendMoviesSlice from "./recommendMoviesSlice";
import languageSlice from "./languageSlice";

const store = configureStore({
    reducer : {
        userInfo : userInfoSlice,
        nowPlayingMovies : nowPlayingMoviesSlice,
        recommendMovies : recommendMoviesSlice,
        languageInfo : languageSlice,
    }
});

export default store;