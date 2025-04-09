// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios';

export const getUserById = createAsyncThunk(
    'users/getUserById',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/Users/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        selectedUser: null,
    },
    reducers: {
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
    },
    
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.selectedUser = action.payload;
        });
    }
});
export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
