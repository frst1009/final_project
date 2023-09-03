import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsAdd, fetchRecipes } from '../redux/slices/recipes';
import moment from 'moment';
import { fetchLogin, selectIsAuth } from '../redux/slices/auth';

function Comments({ recipeId }) {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
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

  return (
    <div className="card mb-3 products">
      <div className="card-header">Comments</div>
      {isAuth ? (
                    <> <div className="card-body">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button className="btn" id='button-link' onClick={handleCommentSubmit}>
          Submit
        </button>
      </div></>):(<>{" "}</>)}
      <ul className="list-group list-group-flush">
        {/* Comment List */}
        {currentRecipe && currentRecipe.comments.map((obj) => (
          <li className="list-group-item comment-div" key={obj._id}>
            <div className="d-flex">
              <div className="flex-grow-1 ">
                <p>User: {obj.username}</p>
                <p>{obj.comment}</p>
              </div>
              <div>
                <p>Posted: <p>{moment(obj.createdAt).format("DD/MM/YYYY")}</p></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
