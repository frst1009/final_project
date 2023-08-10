import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchRecipes = createAsyncThunk('recipe/fetchRecipes',async()=>{
const {data} = await axios.get('/recipe');
return data;
})

const initialState = {
    recipes: {
        items:[],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
}
const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers:{
[fetchRecipes.pending]: (state)=>{//here we dont get to see the items its empty array
    state.recipes.items = [];
	state.recipes.status = 'loading';
},
[fetchRecipes.fulfilled]: (state, action) => {//when the items are fetched 
    state.recipes.items = action.payload;
    state.recipes.status = 'loaded';
},
[fetchRecipes.rejected]: (state) => {
    state.recipes.items = [];
    state.recipes.status = 'error';
},
    }
})
export const recipeReducer = recipeSlice.reducer;