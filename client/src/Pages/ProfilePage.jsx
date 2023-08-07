import React, { useState } from "react";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <label>Name</label>
        <input
        className="input"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your name"
        />
        <label>Email</label>
        <input
        className="input"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Your email"
        />
        <label>Password</label>
        <input
        className="input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Your password"
        />
      </div>
      <button className="input-button" onClick={() => {}}>Save</button>
    </div>
  );
};

export default ProfilePage;
