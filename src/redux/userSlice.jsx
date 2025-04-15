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
    async ({ page = 1, pageSize = 8 }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/Users/All?page=${page}&pageSize=${pageSize}`);
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
export const updateUserA = createAsyncThunk(
    'users/updateUserA',
    async ({userId,data}) => {
        try {
            
            const response = await API.put(`/Users/${userId}`, data);
            
            return response.data;
        } catch (error) {
            console.error('Error updating feature:', error);
            throw error;
        }
    }
);
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async ({userId}) => {
        try {
            
            const response = await API.delete(`/Users/${userId}`);
            
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
        selectedEUser: null,
        Users: [],
        user: null,
    },
    reducers: {
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
        clearSelectedEUser: (state) => {
            state.selectedEUser = null;
        },
        setSelectedEUser: (state, action) => {
            state.selectedEUser = action.payload;
        },
    
    },
    
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.selectedUser = action.payload;
        }).addCase(getAllUser.fulfilled,(state,action)=> {
            state.Users = action.payload;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload;
        }).addCase(updateUserA.fulfilled, (state, action) => {
            state.user = action.payload;
        }).addCase(deleteUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});
export const { clearSelectedUser, clearSelectedEUser, setSelectedEUser} = userSlice.actions;
export default userSlice.reducer;
