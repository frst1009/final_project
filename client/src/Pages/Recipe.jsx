/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { Button, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';


const Recipe = () => {
  const isAuth = useSelector(selectIsAuth);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [, setfirst] = useState(second)
  // const [first, setfirst] = useState(second)
  // const [first, setfirst] = useState(second)
  // const [first, setfirst] = useState(second)

  const handleCategoryChange = (values) => {
    setSelectedCategories(values);
  };

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
                        // value={ingredients}
                        // onChange={(e) => setIngredients(e.target.value.split(','))}
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
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="tags"
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
                        onChange={(e) => e.target.value}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    
    <div className="col-md-12">
      <label className="form-label mb-3" style={{marginRight:"10px"}}>Image</label>
      <Upload accept="image/*" showUploadList={false}>
        <Button icon={<FontAwesomeIcon icon={faImage} />}>Select Image</Button>
      </Upload>
    </div>
                    <div className="col-12 text-center gap-2">
                      <button id="button-link" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;

// const options = [
//   { value: 'breakfast', label: 'Breakfast' },
//   {value:"lunch", label:'Lunch'},
//   {value:"dinner", label:'Dinner'},
//   {value:"snack", label:'Snacks'},
//   {value:"desert", label:'Desert'},
// ];
