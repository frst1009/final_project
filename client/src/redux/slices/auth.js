import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchUserData=createAsyncThunk('auth/fetchUserData', async(params)=>{
    const {data}=await axios.post('/user/login', params);
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
    }
});
export const selectIsAuth = (state) => Boolean(state.auth.data)
export const authReducer= authSlice.reducer;
export const {logout} = authSlice.actions
