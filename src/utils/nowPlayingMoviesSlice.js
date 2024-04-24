import { createSlice } from "@reduxjs/toolkit";

const nowPlayingMoviesSlice = createSlice({
    name : "nowPlayingMovies",
    initialState : {
        movies : [],
        popularMovies : [],
        topRatedMovies : [],
        upComingMovies : [],
        popularTvSeries : [],
        airingToday : [],
        videoDetails : null,
        trailerData : null,
        isMuted : true
    },
    reducers : {
        addMovies : (state, action) => {
            state.movies = action?.payload;
        },
        // Display video details like title, overview
        addVideoDetails : (state, action) => {
            state.videoDetails = action?.payload;
        },
        // Toggle video sound
        toggleVideoSound : (state) => {
            state.isMuted = !state.isMuted;
        },
        addPopularMovies : (state, action) => {
            state.popularMovies = action?.payload;
        },
        addAiringToday : (state, action) => {
            state.airingToday = action?.payload;
        },
        addTopRatedMovies : (state, action) => {
            state.topRatedMovies = action?.payload;
        },
        addUpcomingMovies : (state, action) => {
            state.upComingMovies = action?.payload;
        },
        addPopularTvSeries : (state, action) => {
            state.popularTvSeries = action?.payload;
        },
        addTrailerData : (state, action) => {
            state.trailerData = action?.payload;
        }
    }
});

export const {addMovies, addPopularTvSeries, 
addAiringToday, addVideoDetails, toggleVideoSound,
addUpcomingMovies, addTrailerData, addTopRatedMovies, addPopularMovies} = nowPlayingMoviesSlice.actions;

export default nowPlayingMoviesSlice.reducer;