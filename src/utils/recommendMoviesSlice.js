import { createSlice } from "@reduxjs/toolkit";

const recommendMoviesSlice = createSlice({
    name : "recommendMovies",
    initialState : {
        // Initially, we don't show this component
        showComponent : false,
        recommendMovies : null
    },
    reducers : {
        toggleRecommendComponent : (state) => {
            state.showComponent = !state.showComponent;
        },
        recommendedMoviesInfo : (state, action) => {
            state.recommendMovies = action.payload;
        },
        clearOutRecommendMovies : (state) => {
            state.recommendMovies = null;
        }
    }
})

export const { toggleRecommendComponent, clearOutRecommendMovies, recommendedMoviesInfo } = recommendMoviesSlice.actions;

export default recommendMoviesSlice.reducer;