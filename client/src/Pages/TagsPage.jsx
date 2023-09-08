import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import Cards from "../Components/Cards";
const TagsPage = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  
  const { tag } = useParams(); 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/recipe/?tag=${tag}`);
        console.log(response.data);
        setRecipes(response.data); 
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
  
    }

    fetchData();
   
  }, [tag]);
  console.log(recipes); 
  return (
    <section className="product-details p-5">
      <div className="conntainer-xxl">
      <div className="row">
      <h1 style={{display: "flex", justifyContent:"center"}}>{recipes.length} Recipes Found</h1>
      
        <Cards recipeData={recipes} isPostsLoading={loading} />
   
    </div>
      </div>
    </section>
  );
};

export default TagsPage;
