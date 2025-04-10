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
export const getAllUser = createAsyncThunk(
    'users/getAllUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get(`/Users/All`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({data}) => {
        try {
            
            const response = await API.put(`/Users/UpdateMe`, data);
            
            return response.data;
        } catch (error) {
            console.error('Error updating feature:', error);
            throw error;
        }
    }
);
const userSlice = createSlice({
    name: 'users',
    initialState: {
        selectedUser: null,
        Users: [],
        user: null,
    },
    reducers: {
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
    },
    
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.selectedUser = action.payload;
        }).addCase(getAllUser.fulfilled,(state,action)=> {
            state.Users = action.payload;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});
export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
