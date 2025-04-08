// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios'; // Burada token zaten otomatik header’a eklenmiş olmalı

// Token kontrolü
const token = localStorage.getItem('token');

// Kullanıcı bilgisini getir
export const getMe = createAsyncThunk(
    'auth/getMe',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/Users/me');
            return response.data; // direkt olarak { userId, username, email } döner
        } catch (error) {
            console.error('Error fetching user info:', error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

// Başlangıç durumu
const initialState = {
    isAuthenticated: !!token,
    token: token || null,
    user: null
};

// Slice
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
            state.user = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.token = null;
                localStorage.removeItem('token');
            });
    },
});

// Exportlar
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
