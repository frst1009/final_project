  import React, { useEffect, useState } from "react";
  import axios from "../axios";
  import { useParams } from "react-router-dom";
import Cards from "../Components/Cards";
  const CategoryPage = () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]); // Renamed from `data` to `recipes`
    const { category } = useParams(); 
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/recipe/category?category=${category}`);
          console.log(response.data);
          setRecipes(response.data); 
          setLoading(false);
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      }

      fetchData();
    }, []);

    return (
      <section className="product-details p-5">
        <div className="conntainer-xxl">
          <div className="row">
            <h2>{recipes.length} Recipes</h2>
            {/* {recipes.map((recipe) => (
              <div key={recipe._id}>
                <h3>{recipe.title}</h3>
              </div>
            ))} */}
            <Cards recipeData={recipes} isPostsLoading={loading}/>
          </div>
        </div>
      </section>
    );
  };

  export default CategoryPage;
