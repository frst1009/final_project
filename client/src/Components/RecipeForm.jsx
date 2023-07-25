import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Button, Avatar, Typography, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Option } from "antd/es/mentions";

const RecipeForm = () => {
  const navigate = useNavigate();
  const { loggedIn, user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    picture: "",
    tags: "",
    category: "",
  });


  const handleSubmit = async (e) => {
    console.log("hi");
    if (!loggedIn) {
      navigate("/");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("ingredients", recipe.ingredients);
      formData.append("instructions", recipe.additionalDetails);
      formData.append("image", recipe.image);
      formData.append("category", recipe.category);


      const res = await axios.post(
        "http://localhost:3040/api/recipe/add",
        formData
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (value) => {
    setRecipe({ ...recipe, category: value });
  };
  const handlePhoto = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
    console.log(recipe.image);
  };
  useEffect(() => {
    console.log(recipe.image);
  }, [recipe.image]);
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h2>Write a Recipe</h2>
      {loggedIn ? (
        <Form onFinish={handleSubmit}>
          <Form.Item>
            <Avatar
              icon={<UserOutlined />}
              style={{ backgroundColor: "grey" }}
            />
            <Typography.Text>{user && user.username}</Typography.Text>
          </Form.Item>

          <Form.Item label="Title">
            <Input
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Ingredients">
            <Input.TextArea
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Instructions">
            <Input.TextArea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              value={recipe.category}
              onChange={handleCategoryChange}
              name="category"
              placeholder="Select category"
            >
              <Option value="category1" label= "Breakfast">Breakfast</Option>
              <Option value="category2" label= "Lunch">Lunch</Option>
              <Option value="category3" label= "Dinner">Dinner</Option>
              <Option value="category4" label= "Snacks">Snacks</Option>
              <Option value="category5" label= "Beverages">Beverages</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload Picture">
            <input type="file" name="image" onChange={handlePhoto} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Please log in to write a recipe.</p>
      )}
    </div>
  );
};

export default RecipeForm;
