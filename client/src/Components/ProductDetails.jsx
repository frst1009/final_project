/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";

const ProductDetails = () => {
  return (
    <div className="container p-5">
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
              <h5 className="card-title">Title</h5>
              <h3 className="card-text">name</h3>
              <p className="card-text">
                <span className="text-danger fs-4 me-2">time</span>
              </p>
              <p className="card-text">like</p>
              <p className="card-text mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
                Quibusdam tempore unde aperiam, consectetur harum a eum error,{" "}
                <br /> libero nemo quisquam ex assumenda corrupti rerum aut quod
                et sint facere reprehenderit?
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
