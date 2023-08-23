import React, { useEffect, useState } from "react";
import axios from "../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const ChangePas = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const { search } = useLocation();
  const URLSearch= new URLSearchParams(search)
  const token=URLSearch.get("token")
  const userId=URLSearch.get("userId")
  const [showPassword, setShowPassword] = useState(false); 
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
    <h2 className="text-center">Forgot Password</h2>
    <form onSubmit={handleChangePassword}>
        <div className="profile-info">
          <label>Password</label>
          <div className="password-input input">
            <input
            
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password" types
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash} // Toggle eye and eye-slash icons
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            />
          </div>
        </div>
        <button className="input-button" type="submit">
          Change Password
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ChangePas;
