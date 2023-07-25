import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Tag, Button } from 'antd';

const { Meta } = Card;

const RecipeCard = () => {
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch recipe data from the backend API
    fetchRecipeData()
      .then((data) => setRecipe(data))
      .catch((error) => console.error('Error fetching recipe:', error));
  }, []);

  // Simulated API call to fetch recipe data
  const fetchRecipeData = () => {
    return new Promise((resolve) => {
      // Simulating delay with setTimeout
      setTimeout(() => {
        const recipeData = {
          picture: 'https://www.eatingwell.com/thmb/CTSAuY2CRbo0Ivw4wbfIydhy7Qw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1807w-avocado-toast-recipe-8029771-2000-aefaa92c11e74e80b0bfc15788a61465.jpg',
          tags: ['Breakfast', 'Healthy'],
          dishName: 'Avocado Toast',
          postedBy: 'John Doe',
        };
        resolve(recipeData);
      }, 1000);
    });
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { picture, tags, dishName, postedBy } = recipe;

  return (
    <Card
      cover={<img alt="Recipe" src={picture} />}
      style={{ width: 300, marginBottom: 20 }}
    >
      <Meta
        title={dishName}
        description={`Posted by ${postedBy}`}
      />
      <div style={{ marginTop: 10 }}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    <Button className="custom-button" onClick={() => navigate(`/recipes`)}>Details</Button>
    </Card>
  );
};

export default RecipeCard;
// <button onClick={() => navigate(`/details/${_id}`)}>Details</button>