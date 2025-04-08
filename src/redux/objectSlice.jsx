import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../axios';
const API_BASE_URL = "https://localhost:7223/api";


// getallobj
export const getAllObjects = createAsyncThunk(
    'objects/getAllObjects',
    async () => {
        try {
            //const response = await axios.get(`${API_BASE_URL}/Point`);
            const response = await API.get(`/Point`);
            return response.data.value || [];
        } catch (error) {
            console.error('Error fetching objects:', error);
            throw error;
        }
    }
);

export const addFeature = createAsyncThunk(
    'objects/addFeature',
    async (pointData) => {
        try {
            //const response = await axios.post(`${API_BASE_URL}/Point`, pointData);
            const response = await API.post(`/Point`, pointData);
            return response.data.value;
        } catch (error) {
            console.error('Error adding point:', error);
            throw error;
        }
    }
);

export const deleteFeature = createAsyncThunk(
    'objects/deleteFeature',
    async (id) => {
        try {
            //await axios.delete(`${API_BASE_URL}/Point/${id}`);
            await API.delete(`/Point/${id}`);
            return id;
        } catch (error) {
            console.error('Error deleting feature:', error);
            throw error;
        }
    }
);

export const updateFeature = createAsyncThunk(
    'objects/updateFeature',
    async ({ id, data }) => {
        try {
            //const response = await axios.put(`${API_BASE_URL}/Point/${id}`, data);
            const response = await API.put(`/Point/${id}`, data);
            return response.data.value;
        } catch (error) {
            console.error('Error updating feature:', error);
            throw error;
        }
    }
);

const initialState = {
    objects: [],
    loading: false
}
export const objectSlice = createSlice({
    name: "object",
    initialState,
    reducers:{
        //http istegi olmaz ise!
    },
    extraReducers : (builder) => {
        //http isteklerinde kullailir.
        builder
        .addCase(getAllObjects.fulfilled, (state, action)=> {
            state.objects = action.payload;
        })
        .addCase(addFeature.fulfilled, (state, action) => {
            state.objects.push(action.payload);
            
        })
        .addCase(deleteFeature.fulfilled, (state, action) => {
            state.objects = state.objects.filter(obj => obj.id !== action.payload);
        })
        .addCase(updateFeature.fulfilled, (state, action) => {
            const index = state.objects.findIndex(obj => obj.id === action.payload.id);
            if (index !== -1) {
                state.objects[index] = action.payload;
            }
        })
    }
})

export const { } = objectSlice.actions
export default objectSlice.reducer