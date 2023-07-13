import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        name: null,
        email: null,
        role: null,
    },
    electives: [],
    students: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = initialState.user;
        },
        setStudents: (state, action) => {
            state.students = action.payload;
        },
        setElectives: (state, action) => {
            state.electives = action.payload;
        }
    }
})

export const { login, logout, setStudents, setElectives } = authSlice.actions;
export default authSlice.reducer;