import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchRecipes = createAsyncThunk('recipe/fetchRecipes',async()=>{
const {data} = await axios.get('/api/recipe');
return data;
})
export const fetchTags = createAsyncThunk('recipe/fetchTags',async()=>{
    const {data} = await axios.get('/api/recipe/tags');
    return data;
    })
    export const likeRecipe = createAsyncThunk('recipe/likeRecipe', async (recipeId) => {
        const {data} = await axios.put(`/api/recipe/like/${recipeId}`);
        return data; 
      });    

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
[fetchTags.pending]: (state)=>{//here we dont get to see the items its empty array
    state.tags.items = [];
	state.tags.status = 'loading';
},
[fetchTags.fulfilled]: (state, action) => {//when the items are fetched 
    state.tags.items = action.payload;
    state.tags.status = 'loaded';
},
[fetchTags.rejected]: (state) => {
    state.tags.items = [];
    state.tags.status = 'error';
},
[likeRecipe.fulfilled]: (state, action) => {
    const { recipeId, liked } = action.payload;
    const recipeToUpdate = state.recipes.items.find((recipe) => recipe._id === recipeId);
    if (recipeToUpdate) {
      recipeToUpdate.isLiked = liked;
    }
  },
    }
})
export const recipeReducer = recipeSlice.reducer;