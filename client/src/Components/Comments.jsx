import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsAdd, fetchRecipes } from '../redux/slices/recipes';
import moment from 'moment';
import { fetchLogin, selectIsAuth } from '../redux/slices/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faX } from '@fortawesome/free-solid-svg-icons';
import axios from "../axios";

function Comments({ recipeId }) {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState(null);
  const { recipes } = useSelector((state) => state.recipes);
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchLogin());
  }, [dispatch]);

  const currentRecipe = recipes.items.find((recipe) => recipe._id === recipeId);

  const handleCommentSubmit = async () => {
    if (comment.trim() !== '') {
      try {
        const commentData = {
          comment: comment,
          username: currentUser.user.username, 
        };
        await dispatch(commentsAdd({ recipeId, comment: commentData }));
        setComment('');
        dispatch(fetchRecipes());
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        // Assuming you have a route to delete comments by commentId
        await axios.delete(`/api/recipe/${recipeId}/comments/${commentId}`);
        // After successful deletion, refresh the comments by fetching recipes
        dispatch(fetchRecipes());
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleEditComment = (commentId) => {
    setEditComment(commentId);
  };
  
  const handleSaveEditComment = async (commentId) => {
    try {
      await axios.put(`/api/recipe/${recipeId}/comments/${commentId}`, { comment: comment });
      setEditComment(null);
      dispatch(fetchRecipes());
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="card mb-3 products">
      <div className="card-header">Comments</div>
      {isAuth ? (
                    <> <div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{backgroundColor:"#ffe5d5"}}
          ></textarea>
        </div>
        <button className="btn" id='button-link' onClick={handleCommentSubmit}>
          Submit
        </button>
      </div></>):(<>{" "}</>)}
<ul className="list-group list-group-flush">
  {currentRecipe &&
    currentRecipe.comments.map((obj) => (
      <li className="list-group-item comment-div" key={obj._id}>
        <div className="d-flex">    <img
                        src={obj.avatar
                          ? `http://localhost:3040${currentUser.user.avatar}`
                          : 'https://static.vecteezy.com/system/resources/previews/013/331/127/original/account-avatar-dark-mode-glyph-ui-icon-personal-page-of-site-user-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg'}
                        alt="Selected Image"
                        className="img-thumbnail"
                        style={{ maxWidth: '30px', height:"30px",objectFit: 'cover', marginRight:"10px" }}
                      />
          <div className="flex-grow-1">
      
            <p>User: {obj.username}</p>
            {editComment === obj._id ? (
              <textarea
                className="form-control"
                rows="3"
                value={comment} 
                style={{backgroundColor:"transparent"}}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            ) : (
              <p>{obj.comment}</p>
            )}
          </div>
          <div>
            <p>
              Posted: <p>{moment(obj.createdAt).format("DD/MM/YYYY")}</p>
            </p>
          </div>
          {currentUser && currentUser.user && currentUser.user._id === obj.user && (
            <>
              <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "0 0 0 20px" }}>
                <FontAwesomeIcon
                  icon={faX}
                  style={{ color: "white", marginBottom: "5px" }}
                  onClick={() => handleDeleteComment(obj._id)}
                />
                {editComment === obj._id ? (
                  <button className="btn" onClick={() => handleSaveEditComment(obj._id)} style={{color:"white"}}>
                    Save
                  </button>
                ) : (
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ color: "white" }}
                    onClick={() => handleEditComment(obj._id)}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </li>
    ))}
</ul>

    </div>
  );
}

export default Comments;
