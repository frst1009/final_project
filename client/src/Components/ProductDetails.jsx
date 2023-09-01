/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Comments from "./Comments";

const ProductDetails = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); //just destructed id
  useEffect(() => {
    axios
      .get(`/api/recipe/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error finding recipe!");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }
  return (
    <div className="container p-5" id={data._id}>
      <div className="row">
        <div className="col-lg-6 product-card">
          <div className="card m-auto products">
            <img
              src={`http://localhost:3040${data.image}`}
              alt=""
              className="card-img-top img-fluid p-2"
            />
          </div>
        </div>

        <div className="col-lg-6" > 
          <div className="card p-5 m-auto products">
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <h2 className="card-text">Created by: {data.user.username}</h2>
              {/* <p className="card-text">Likes: {data.likes.length}</p> */}
              <h2 className="card-text me-2">
                Required cooking time: {data.cookingTime}
              </h2>

              {/* <h2 className="card-text mb-3">{data.instructions}</h2> */}
            </div>
          </div>
          {/* <div className="card">
            <div className="d-flex justify-content-center flex-column align-items-center">
             
              <p className="mb-2">
               something
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12" >
        <div className="card p-5 m-auto products">
          <h2>Ingredients</h2>
          <ul>
          {data.ingredients.map((ingredient, index) => (
      <li key={index} className="mb-2">{ingredient}</li>
    ))}
          </ul>

          <p className="card-text mb-3">{data.instructions}</p>
          {/* Comment Section */}
        </div>{" "}
        <Comments recipeId={id}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
