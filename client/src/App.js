import React, { useEffect} from "react";
import {  Route,  Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Signup from "./Pages/Sign";
import Details from "./Pages/Details";
import ProfilePage from "./Pages/ProfilePage";
import Recipe from "./Pages/Recipe";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, selectIsAuth } from "./redux/slices/auth";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLogin());
  }, [])
  
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='recipe' element={<Recipe />} />
          <Route path='profile' element={<ProfilePage/>}/>
          <Route path='details/:id' element={<Details/>}/> 
          </Route>
        </Routes>
    </>
  );
}

export default App;
