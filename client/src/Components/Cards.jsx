import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faPenToSquare, faRectangleXmark, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, fetchRemoveRecipe } from "../redux/slices/recipes";
import { fetchLogin, selectIsAuth } from "../redux/slices/auth";

const Cards = ({recipeData, isPostsLoading}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchLogin());
  }, [dispatch]);

  const handleDeleteRecipe = async (recipeId) => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    
    // if (confirmDelete) {
    //   try {
    //     const response = await axios.delete(`/api/recipe/${recipeId}`);
    //     const data = response.data;

    //     if (response.status === 200) {
    //       // Recipe deleted successfully, you can update your UI as needed
    //       dispatch(fetchRecipes());
    //     } else {
    //       console.error(data.msg);
    //     }
    //   } catch (error) {
    //     console.error("An error occurred:", error);
    //   }
    // }
    if(window.confirm('Are you sure you want to delete this recipe?')){
      dispatch(fetchRemoveRecipe(recipeId))
    }
  };
  const navigate = useNavigate();
 const handleEdit=(recipeId)=>{
  navigate(`/details/${recipeId}/edit`)
 }

  const handleLike = async (recipeId, liked) => {
  
    try {
      const response = await axios.post(`/api/recipe/like/${recipeId}`, {
        liked,
      });
      const data = response.data;
  
      if (response.status === 200) {
        dispatch(fetchRecipes()); 
      } else {
        console.error(data.msg);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section className="recipe-cards p-5">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "70px",
        }}
      >
        <p style={{ fontSize: "25px", fontWeight: "800" }}> Recipes</p>
      </div>
      <div className="container-xxl">
        <Row gutter={[16, 16]}>
          {isPostsLoading
            ? [...Array(5)].map((_, index) => (
                <Col key={index} xs={24} md={8}>
                  <Card className="custom-card loading-card" />
                </Col>
              ))
            : recipeData.map((obj) => (
                <Col key={obj._id} xs={24} md={8}>
                  <Card
                    hoverable
                    className="custom-card"
                    bodyStyle={{ padding: "16px"}}
                    style={{backgroundColor:"transparent"}}
                  >
                    <div className="card-image">
                      <img
                        src={`http://localhost:3040${obj.image}`}
                        alt=""
                        className="card-img-top p-2"
                      />
                    </div>
                    <div className="card-content">
                      <Link to={`/details/${obj._id}`}>
                        <h3 className="card-title">
                          {obj.title.length > 10
                            ? obj.title.substring(0, 10) + "..."
                            : obj.title}
                        </h3>
                        <i>Created by {obj.user.username}</i>
                        {/* <div>
                          <p className="card-description">
                            {obj.instructions.length > 20
                              ? obj.instructions.substring(0, 20) + "..."
                              : obj.instructions}
                          </p>
                        </div> */}
                      </Link>
                      <div className="card-content-icon">
                      {isAuth ? (
    <FontAwesomeIcon
      icon={faHeart}
      
      onClick={() => {
        if (userId && userId.user && userId.user._id) {
          handleLike(obj._id, !obj.likes.includes(userId.user._id));
        }
      }}
      style={{

        color: userId && userId.user && obj.likes.includes(userId.user._id) ? "aqua" : "white",
      }}
    />
  ) : (
    <FontAwesomeIcon icon={faHeart} />
  )}

                      
                        <span className="card-content-icon-heart" style={{color:"white"}}>{obj.likes.length}</span>
{/*                  
                        <FontAwesomeIcon
                          icon={faComment}
                          style={{ color: "grey" }}
                        /> */}
  {userId && userId.user && userId.user._id === obj.user._id && (<>
                        <FontAwesomeIcon icon={faPenToSquare}
                        style={{color:"white", marginRight:"15px"}} onClick={() => handleEdit(obj._id)}/>
                        <FontAwesomeIcon icon={faRectangleXmark} onClick={() => handleDeleteRecipe(obj._id)} style={{color:"white"}}/> </>) }
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