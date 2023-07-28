import {  Route,  Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Components/Sign";
import Recipe from "./Components/Recipe";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='recipe' element={<Recipe />} />
          
          </Route>
        </Routes>
    </>
  );
}

export default App;
