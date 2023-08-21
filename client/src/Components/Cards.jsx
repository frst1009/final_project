import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, likeRecipe } from "../redux/slices/recipes";
import TagBubble from "./TagBubbles";

const Cards = () => { 
   const dispatch = useDispatch();  
   const { recipes } = useSelector((state) => state.recipes); //refering to store
   const isPostsLoading = recipes.status == "loading";
   useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleLike = (recipeId) => {
    dispatch(likeRecipe(recipeId));
  };

  return (
    <section className="recipe-cards p-5">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <p style={{ fontSize: "25px", fontWeight: "800" }}>Recipes</p>
      </div>
      <TagBubble />
      <div className="container-xxl">
        <Row gutter={[16, 16]}>
          {isPostsLoading
            ? [...Array(5)].map((_, index) => (
                <Col key={index} xs={24} md={8}>
                  <Card className="custom-card loading-card" />
                </Col>
              ))
            : recipes.items.map((obj) => (
                <Col key={obj._id} xs={24} md={8}>
                  <Card
                    hoverable
                    className="custom-card"
                    bodyStyle={{ padding: "16px" }}
                  >
                    {/* <div className="card-image" > */}
                    <img
              src={`http://localhost:3040${obj.image}`}
              alt=""
              className="card-img-top img-fluid p-2"
            />
                    {/* </div> */}
                    <div className="card-content">
                      <Link to={`/details/${obj._id}`}>
                        {" "}
                        <h3 className="card-title">{obj.title}</h3>
                        <i>Created by {obj.user.username}</i>
                        <div>
                          {" "}
                          <p className="card-description">
                            {obj.instructions.length > 100
                              ? obj.instructions.substring(0, 100) + "..."
                              : obj.instructions}
                          </p>
                        </div>
                      </Link>
                      <div className="card-content-icon">
                      <FontAwesomeIcon
                          icon={obj.isLiked ? solidHeart : faHeart}
                          onClick={() => handleLike(obj._id)}
                          // style={{
                          //   color: obj.isLiked ? "red" : "grey",
                          // }}
                          className="card-content-icon-heart"
                        />
                        <FontAwesomeIcon
                          icon={faComment}
                          style={{ color: "grey" }}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </section>
  );
};

export default Cards;
