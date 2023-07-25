import "./App.css";
import Main from "./Pages/Main";
import { Routes, Route } from "react-router-dom";
import RecipePage from "./Pages/RecipePage";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import RecipeForm from "./Components/RecipeForm";
import Navbar from "./Components/Navbar/Navbar";
import SiteFooter from "./Components/Footer/Footer";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes> 
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <RecipeForm />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Main />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
       
      </Routes>
      <SiteFooter />
    </>
  );
}

export default App;
