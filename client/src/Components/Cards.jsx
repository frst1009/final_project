import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as heart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidheart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/slices/recipes";
import TagBubble from "./TagBubbles";

const Cards = () => {
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = () => {
    setIsLiked(!isLiked);
  };
  const dispatch = useDispatch();
  const { recipes} = useSelector((state) => state.recipes); //refering to store
  const isPostsLoading = recipes.status == "loading";
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);


  return (
    <section className="hot-deals p-5">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "0.8px solid #250f06",
          borderTop: "0.8px solid #250f06",
          marginBottom: "40px",
        }}
      >
        <p style={{ fontSize: "25px", fontWeight: "800" }}>Recipes</p>
        
      </div><TagBubble/>
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
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url("https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=")` }}
                  />
                  <div className="card-content">
                  <Link to={`/details/${obj._id}`}>
                      {" "}
                      <h3 className="card-title">{obj.title}</h3>
                      <i>Created by {obj.username}</i>
                    <div> <p className="card-description">
                    {obj.instructions.length > 100
          ? obj.instructions.substring(0, 100) + "..." 
          : obj.instructions}
      </p></div>  
                    </Link>
                    <div className="card-content-icon">
                      <FontAwesomeIcon
                        icon={isLiked ? solidheart : heart}
                        onClick={handleClick}
                        style={{ color: "grey" }}
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
            )
          )}
        </Row>
      </div>
    </section>
  );
};

export default Cards;
