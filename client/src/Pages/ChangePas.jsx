import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePas = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const { search } = useLocation();
  const URLSearch= new URLSearchParams(search)
  const token=URLSearch.get("token")
  const userId=URLSearch.get("userId")
  
  // useEffect(() => {
  //   if (!token || !userId) {
  //     // navigate("/login");
  //     console.log("went wrong");
  //   }
  // }, [URLSearch]);

  const handleChangePassword = async (event) => {  
    event.preventDefault(); 
    const data={
      userId,
      token,
      password
    }
    try {
      const response = await axios.put(`/api/user/changepassword?token=${token}&userId=${userId}`, {
        password
      });
      console.log(response); 
      setMessage(response.data);  
       console.log("Navigating to /login");
       navigate("/login");
   
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };


  return (
    <div className="profile-page">
      <h1>Change password</h1>
      <form onSubmit={handleChangePassword}>
      <div className="profile-info">
        <label>Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>
      <button className="input-button" type="submit">Change Password</button>
      {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ChangePas;
