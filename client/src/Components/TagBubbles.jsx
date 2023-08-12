import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../redux/slices/recipes';

const TagBubble = () => {
    const dispatch = useDispatch();
    const { tags } = useSelector((state) => state.recipes);
    useEffect(() => {
        dispatch(fetchTags());
      }, []);
  return (
    <section className='tags-section'><div className="tag-bubble-container">
     {tags.items.map((tag, index)  => (
                <span key={index} className="tag-bubble">
                    #{tag}
                </span>
            ))}
    </div></section>
    
  );
};

export default TagBubble;
