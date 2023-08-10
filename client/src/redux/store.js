import { configureStore } from '@reduxjs/toolkit';
import { recipeReducer } from './slices/recipes';
// import { authReducer } from './slices/auth';
// import { usersReducer } from './slices/users';

const store = configureStore({
	reducer: {
		recipes: recipeReducer,
		// auth: authReducer,
		// users: usersReducer,
	},
});

export default store;