import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsAdd, fetchRecipes } from '../redux/slices/recipes';
import moment from 'moment';

function Comments({ recipeId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const { recipes } = useSelector((state) => state.recipes);
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    dispatch(fetchRecipes());
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
    <div className="card mb-3">
      <div className="card-header">Comments</div>
      <div className="card-body">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleCommentSubmit}>
          Submit
        </button>
      </div>
      <ul className="list-group list-group-flush">
        {/* Comment List */}
        {currentRecipe && currentRecipe.comments.map((comment) => (
          <li className="list-group-item" key={comment._id}>
            <div className="d-flex">
              <div className="flex-grow-1">
                <h4>{comment.username}</h4>
                <h5>{comment.comment}</h5>
              </div>
              <div>
                <small>Posted: <td>{moment(comment.createdAt).format("DD/MM/YYYY")}</td></small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
