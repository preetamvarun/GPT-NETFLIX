import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name : "languageInfo",
    initialState : {
        /* By default the language code is en which is english */
        languageCode : "en"
    },
    reducers : {
        setLanguage : (state, action) => {
            state.languageCode = action.payload;
        }
    }
})

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;