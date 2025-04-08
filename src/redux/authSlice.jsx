// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const initialState = {
    isAuthenticated: !!token,
    token: token || null,
    user: null // istersen kullanıcı bilgisi de saklayabilirsin
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
