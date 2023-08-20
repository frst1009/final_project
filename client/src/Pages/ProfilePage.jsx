import React, { useState } from "react";
import axios from "../axios";

const ChangePas = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    try {
      const response = await axios.post("/api/user/changepassword", {
        password: password,
      });
      setMessage(response.data);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="profile-page">
      <h1>Change password</h1>
      <div className="profile-info">
        <label>Email</label>
        <input
        className="input"
          type="email"
          value={response.data.email}
readOnly
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
      <button className="input-button" onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePas;
