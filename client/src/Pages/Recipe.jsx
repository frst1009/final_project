/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "../axios";

const Recipe = () => {
  const {id}=useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategories] = useState([]);
  const [cookingTime, setCookingt] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const isEditing = Boolean(id);

  useEffect(() => {
if(id){
  axios.get(`/api/recipe/${id}`).then(({data})=>{
    setTitle(data.title);
    setCategories(data.category);
    setTags(data.tags);
    setCookingt(data.cookingTime);
    setIngredients(data.ingredients);
    setInstructions(data.instructions);
    setImage(data.image)
  })
}
  }, [])
  
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.fileList[0].originFileObj;
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      // console.log(data.url);
     setImage(data.url);
    } catch (error) {
      alert("error in file upload!");
    }
  };
  const handleImageSelection = (event) => {
    event.preventDefault(); 
  };
  const handleCategoryChange = (values) => {
    setCategories(values);
  };
    // const onClickRemove=()=>{setImage("")}
  const onSubmit = async(event)=>{
    event.preventDefault();
try {
  setloading(true);
  const fields={
title,
tags,
category,
cookingTime,
ingredients,
instructions,
image
  };
  const {data} = isEditing ? await axios.patch(`/api/recipe/${id}`,fields)
  : await axios.post('/api/recipe/add',fields);

  // const _id = isEditing ? id : data._id;
  navigate(`/`);
} catch (error) {
console.warn(error);
alert('Upload error!');
}
  }


  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="recipe p-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-lg-8 col-md-10 col-sm-12 m-auto">
              <div className="card p-5">
                <h2 className="mb-4" style={{ fontWeight: "600" }}>
                  Create Recipe
                </h2>
                <form onSubmit={onSubmit}>
                <div className=" d-flex align-items-center justify-content-center">
                  <div className="row g-3">
                    {/* title */}
                    <div className="col-md-6">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mb-3"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="title"
                        aria-label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    {/* cooking time */}
                    <div className="col-md-6">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mb-3"
                      >
                        Cooking time(min)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="cooking time"
                        value={cookingTime}
                        onChange={(e) => setCookingt(e.target.value)}
                      />
                    </div>
                    {/* category */}

                    <div
                      className="col-md-12"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mb-3"
                      >
                        Category
                      </label>

                      <Select
                        mode="multiple"
                        placeholder="Select categories"
                        onChange={handleCategoryChange}
                        style={{ width: "100%" }}
                        className="custom-select"
                        // value={categories}
                      >
                        <Option value="breakfast">Breakfast</Option>
                        <Option value="lunch">Lunch</Option>
                        <Option value="dessert">Dessert</Option>
                        <Option value="dinner">Dinner</Option>
                        <Option value="snacks">Snacks</Option>
                        <Option value="beverages">Beverages</Option>
                      </Select>
                    </div>
                    {/* ingredients */}
                    <div className="col-md-12">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mb-3"
                      >
                        Ingredients
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ingredients"
                        value={ingredients}
                        onChange={(e) =>
                          setIngredients(e.target.value.split(","))
                        }
                      />
                    </div>
                    {/* tags */}
                    <div className="col-12">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mb-3"
                      >
                        Tags
                      </label>
                      <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Enter tags"
                        value={tags}
                        onChange={(newTags) => setTags(newTags)}
                      />
                    </div>
                    {/* instructions */}
                    <div className="col-12">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Write instruction
                      </label>
                      <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="col-md-12">
                      <label
                        className="form-label mb-3"
                        style={{ marginRight: "10px" }}
                      >
                        Image
                      </label>
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        type="file"
                        beforeUpload={() => false} 
                        onChange={handleChangeFile}
                      >
                        {image ? (
                          <>
                            {/* <Button
                              icon={<FontAwesomeIcon icon={faTrashCan} />}
                              onClick={onClickRemove}
                            >
                              Delete
                            </Button> */}
                            <div className="image-preview">
                           <img
                            src={`http://localhost:3040${image}`}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                          </>
                        ) : (<><Button
            icon={<FontAwesomeIcon icon={faImage} type="button" />}
            onClick={handleImageSelection}
          >
            Select Image
          </Button></>)}
                          
                      </Upload>
                    </div>
                    <div className="col-12 text-center gap-2">
                      <button id="button-link" type="submit">
                       {isEditing ? "Save changes" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
