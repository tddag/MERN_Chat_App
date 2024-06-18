import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
    activeUsers: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        submitStart: (state) => {
            state.isLoading = true;
            state.error = "";
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        submitFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        reset: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = "";
            state.activeUsers = [];
        },
        setActiveUsers: (state, action) => {
            state.activeUsers = action.payload
        }
    }
})

export const { submitStart, signInSuccess, submitFailure, reset, setActiveUsers} = userSlice.actions;
export default userSlice.reducer;