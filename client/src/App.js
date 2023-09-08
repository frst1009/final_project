import React, { useEffect} from "react";
import {  Route,  Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Signup from "./Pages/Sign";
import Details from "./Pages/Details";
import Recipe from "./Pages/Recipe";
import Login from "./Pages/Login";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLogin, selectIsAuth } from "./redux/slices/auth";
import PersonalPage from "./Pages/PersonalPage";
import ForgotPass from "./Pages/ForgotPass";
import Changepassword from "./Pages/ChangePassword";
import CategoryPage from "./Pages/CategoryPage";
import Populars from "./Pages/Populars";
import About from "./Pages/AboutPage";
import TagsPage from "./Pages/TagsPage";
// import EditProfileComponent from "./Pages/EditUserInfo";


function App() {
  // const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);
  // useEffect(() => {
  //   dispatch(fetchLogin());
  // }, [])
  
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='recipe' element={<Recipe />} />
          <Route path='details/:id/edit' element={<Recipe />} />
          <Route path='changepassword' element={<Changepassword/>}/>
          <Route path='details/:id' element={<Details/>}/> 
          <Route path='forgotpassword' element={<ForgotPass/>}/>
          <Route path='personalpage' element={<PersonalPage/>}/>
          <Route path='category/:category' element={<CategoryPage/>}/>
          <Route path='populars' element={<Populars/>}/>
          <Route path='tags/:tags' element={<TagsPage/>}/>
          {/* <Route path='edit' element={<EditProfileComponent/>}/> */}
          </Route>
        </Routes>
    </>
  );
}

export default App;
