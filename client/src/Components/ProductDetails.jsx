/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import axios from "../axios";
import React, {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const ProductDetails = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); //just destructed id
  useEffect(() => {
    axios.get(`/recipe/${id}`).then(res=>{
      setData(res.data);
      setLoading(false)
    })
    .catch((err) =>{
      console.warn(err);
      alert("Error finding recipe!");
      setLoading(false)

    } )
  }, []);

  if(loading){
    return  <Spinner loading={loading}/>
  }
  return (
    <div className="container p-5" id={data._id}>
      <div className="row">
        <div className="col-lg-6">
          <div className="card p-5 m-auto">
            <img
              src="./img/cooking.png"
              alt=""
              className="card-img-top img-fluid p-2"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-3 m-auto">
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <h3 className="card-text">Created by:{data.user.username}</h3>
              <p className="card-text">
                <span className="text-danger fs-4 me-2">Required cooking time: {data.cookingTime}</span>
              </p>
              <p className="card-text">like</p>
              <p className="card-text mb-3">
               {data.instructions}
              </p>
            </div>
          </div>
          <div className="card">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <h2 className="text-center mb-2">More products of the same</h2>
              <p className="mb-2">
                We have more products, visit the shop to get amazing deals from
                us!!
              </p>
            </div>
            <div className="d-none d-md-block">
              <div className="row mb-3">
                <div className="col-6 col-md-4 col-lg-8 mx-auto">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                    <div className="col">
                      <div className="card h-100">
                        <img
                          src="./img/cooking.png"
                          className="card-img-top"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6 col-md-4 col-lg-8 mx-auto">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                    <div className="col">
                      <div className="card h-100">
                        <img
                          src="./img/cooking.png"
                          className="card-img-top"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
