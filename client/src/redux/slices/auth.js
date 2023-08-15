import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData=createAsyncThunk('auth/fetchUserData', async(params)=>{
    const {data}=await axios.post('/user/login', params);
    return data;
})
export const fetchRegister=createAsyncThunk('auth/fetchRegister', async(params)=>{
    const {data}=await axios.post('/user/register', params);
    return data;
})
export const fetchLogin=createAsyncThunk('auth/fetchLogin', async()=>{
    const {data}=await axios.get('/user/authuser');
    return data;
})
const initialState = {

        data:null,
        status: 'loading'
    };
   
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.data=null;
        }
    },
    extraReducers:{
        [fetchUserData.pending]: (state)=>{//here we dont get to see the items its empty array
            state.status = 'loading';
            state.data = null;

        },
        [fetchUserData.fulfilled]: (state, action) => {//when the items are fetched 
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUserData.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchLogin.pending]: (state)=>{//here we dont get to see the items its empty array
            state.status = 'loading';
            state.data = null;

        },
        [fetchLogin.fulfilled]: (state, action) => {//when the items are fetched 
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchLogin.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchRegister.pending]: (state)=>{//here we dont get to see the items its empty array
            state.status = 'loading';
            state.data = null;

        },
        [fetchRegister.fulfilled]: (state, action) => {//when the items are fetched 
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
    }
);
export const selectIsAuth = (state) => Boolean(state.auth.data)
export const authReducer= authSlice.reducer;
export const {logout} = authSlice.actions
