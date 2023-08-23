import React, { useState } from 'react';

const PersonalPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const toggleEdit = () => setIsEditable(!isEditable);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="user-info">
            <img src="user-avatar.jpg" alt="User Avatar" className="rounded-circle" />
            <h2>Username</h2>
            {isEditable ? (
              <input type="text" defaultValue="Bio" />
            ) : (
              <p>Bio</p>
            )}
            {isEditable ? (
              <input type="email" defaultValue="Email" />
            ) : (
              <p>Email</p>
            )}
            <button onClick={toggleEdit}>
              <i className="fa fa-edit"></i> {/* Font Awesome icon */}
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="recipe-cards">
            {/* Map through recipes and display cards */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
