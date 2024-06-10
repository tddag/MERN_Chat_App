import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null
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
        }
    }
})

export const { submitStart, signInSuccess, submitFailure, reset} = userSlice.actions;
export default userSlice.reducer;