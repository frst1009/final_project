import React from 'react'
import Recipe from './Recipe'
import { selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddRecipe = () => {
    const isAuth = useSelector(selectIsAuth);
    if(!isAuth)
      {<Navigate to="/"/>}
  return<>
<Recipe/>
  </>
}

export default AddRecipe