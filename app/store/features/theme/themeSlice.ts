"use client";
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: getInitialTheme(),
    },
    reducers: {
        toggleTheme: (state) => {
            state.value = state.value === 'light' ? 'dark' : 'light';
            localStorage.setItem("theme", state.value);
        },
        setTheme: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("theme", state.value);
        }
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
