import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../redux/slices/recipes';
import { Link } from 'react-router-dom';

const TagBubble = () => {
    const dispatch = useDispatch();
    const { tags } = useSelector((state) => state.recipes);
    useEffect(() => {
        dispatch(fetchTags());
      }, []);

  return (
    <section className='tags-section'><div className="tag-bubble-container">
     {tags.items.map((tag, index)  => (
            <Link to={`/tags/${tag}`}><span key={index} className="tag-bubble">
                    #{tag}
                </span></Link>    
            ))}
    </div></section>
    
  );
};

export default TagBubble;
