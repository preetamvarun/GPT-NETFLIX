import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
    name : "userInfo",
    initialState : null,
    reducers : {
        addUser : (state, action) => {
            return action.payload; // Assign the payload object directly to the state.
        },
        removeUser : () => {
            return null; // Assign the state back to null. This action is dispatched when user signs out.
        }
    }
})

export const {addUser, removeUser} = userInfoSlice.actions;

export default userInfoSlice.reducer;