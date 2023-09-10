/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Comments from "./Comments";
import TagBubble from "./TagBubbles";

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
    <div className="container p-3" id={data._id}>
       <div className="container-xl">
       <div className="row">
        <div className="col-md-12 product-card">
        <h1 className="card-title" style={{textAlign:"center"}}>{data.title}</h1>
        <h5 className="card-title text-center">Created by user: {data.user.username}</h5>
        </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card p-3 m-2 products">
            <img
              src={`http://localhost:3040${data.image}`}
              alt=""
              className="card-img-top img-fluid"
            />
          </div>
        </div>

        {/* <div className="col-lg-6" > 
          <div className="card p-5 m-auto products">
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <h2 className="card-text">Created by: {data.user.username}</h2>
              {/* <p className="card-text">Likes: {data.likes.length}</p> */}
              {/* <h2 className="card-text me-2">
                Required cooking time: {data.cookingTime}
              </h2>
            </div>
          </div>
        </div> */}
        <div className="col-md-6" >
        <div className="card p-3 m-2 products">
        <h2 style={{margin:"auto"}}>Time to make: {data.cookingTime}min</h2>
          <h2>Ingredients</h2>
          <ul>
          {data.ingredients.map((ingredient, index) => (
      <li key={index} className="mb-2">{ingredient}</li>
    ))}
          </ul>
          <h2>Instructions</h2>
          <p className="card-text mb-3">{data.instructions}</p>
          <ul>
          {data.tags.map((tag, index) => (
      <Link to={`/tags/${tag}`}><li key={index} className="mb-2">#{tag}</li></Link>
    ))}
          </ul>
          {/* Comment Section */}
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Comments recipeId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
