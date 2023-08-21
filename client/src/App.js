import React, { useEffect} from "react";
import {  Route,  Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Signup from "./Pages/Sign";
import Details from "./Pages/Details";
import Recipe from "./Pages/Recipe";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, selectIsAuth } from "./redux/slices/auth";
import ForgotPassword from "./Pages/ForgotPas";
import ChangePas from "./Pages/ChangePas";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
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
          <Route path='changepassword' element={<ChangePas/>}/>
          <Route path='details/:id' element={<Details/>}/> 
          <Route path='forgotpassword' element={<ForgotPassword/>}/>
          </Route>
        </Routes>
    </>
  );
}

export default App;
