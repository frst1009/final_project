import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, selectIsAuth } from '../redux/slices/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../axios';
import Spinner from '../Components/Spinner';
import { Card, Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { fetchRecipes, fetchRemoveRecipe } from '../redux/slices/recipes';

const { Meta } = Card;

const PersonalPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.data);

  useEffect(() => {
    axios
      .get(`/api/recipe/userRecipe`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        dispatch(fetchLogin());
      })
      .catch((err) => {
        console.warn(err);
        alert("Error finding recipe!");
        setLoading(false);
      });
  }, [dispatch]);
  const handleDeleteRecipe = async (recipeId) => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    
    // if (confirmDelete) {
    //   try {
    //     const response = await axios.delete(`/api/recipe/${recipeId}`);
    //     const data = response.data;

    //     if (response.status === 200) {
    //       window.location.reload();
    //     } else {
    //       console.error(data.msg);
    //     }
    //   } catch (error) {
    //     console.error("An error occurred:", error);
    //   }
    // }
    if(window.confirm('Are you sure you want to delete this recipe?')){
      dispatch(fetchRemoveRecipe(recipeId))
      window.location.reload();
    }
  };
  const navigate = useNavigate();
 const handleEdit=(recipeId)=>{
  navigate(`/details/${recipeId}/edit`)
 }
  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="recipe p-5">
    <div className="container-xxl">
      <div className="row">
        <div className="col-md-12">
          <Card style={{backgroundColor:"#4d233f12"}}>
            <div className="d-flex flex-column align-items-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Profile Image"
                className="mt-4 mb-2 img-thumbnail"
                style={{ width: '150px', zIndex: '1' }}
              />
              <Button outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                Edit Profile
              </Button>
              <Typography.Title level={5} className="mt-3">
                {currentUser && currentUser.user && currentUser.user.username}
              </Typography.Title>
              <Typography.Text>Email Address</Typography.Text>
              <Typography.Paragraph className="font-italic">
                {currentUser && currentUser.user && currentUser.user.email}
              </Typography.Paragraph>
            </div>
          </Card>
          {/* Recipe Content */}
          <h1 style={{textAlign:"center", marginTop:"40px", marginBottom:"30px"}}>Recipes</h1>
          <div className="col-12 p-3">
            <div className="row">
              {data.map((recipe) => ( <Link to={`/details/${recipe._id}`}>
                <div className="col-6 mb-3" key={recipe._id}>
                  <div className="card" style={{backgroundColor:"transparent"}}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={`http://localhost:3040${recipe.image}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }}
 alt="" className="img-fluid rounded-start" />
                      </div>
                      <div className="col-md-8">
                        <div style={{display:"flex", justifyContent: "start", flexDirection:"column", margin:"30px"}}>
                          <h5 className="card-title">{recipe.title}</h5>
                          <div><FontAwesomeIcon icon={faPenToSquare}
                        style={{color:"white", marginRight:"15px"}} onClick={()=> handleEdit(recipe._id)}/>
                        <FontAwesomeIcon icon={faRectangleXmark} onClick={() => handleDeleteRecipe(recipe._id)} style={{color:"white"}}/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div></Link> 
              ))}
            </div>
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default PersonalPage;
