import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import Cards from "../Components/Cards";
const Populars = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]); 


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/recipe/populars`);
        console.log(response.data);
        setRecipes(response.data); 
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
  
    }

    fetchData();
   
  }, []);

  return (
    <section className="product-details p-5">
      <div className="conntainer-xxl">
      <div className="row">
      <h1 style={{display: "flex", justifyContent:"center"}}>Popular Recipes</h1>
      
        <Cards recipeData={recipes} isPostsLoading={loading}/>
    </div>
      </div>
    </section>
  );
};

export default Populars;
