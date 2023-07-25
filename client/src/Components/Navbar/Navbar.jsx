import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const [click, setClick] = useState(false);
  const [term, setTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const { loggedIn, user, handlerLogInOut } = useContext(AuthContext);
  const navigate = useNavigate();
  // const handleSearch = (value) => {
  //   console.log("Search:", value);
  // };

  const handleLogout = () => {
    handlerLogInOut(false, () => navigate("/login"));
  };

  const handleClick = () => setClick(!click);
  const handleSearch = () => {
    const input = document.querySelector(".nav-search");
    input.focus();
  };
  const handleKeyUp = (event) => {
    setTerm(event.target.value);
    axios.get(`/api/recipe?term=${term}`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-link">
            <NavLink to="/" className="nav-logo">
              Cooking monsters
            </NavLink>
          </div>
          <div className="nav-lin">
            <i
              onClick={handleSearch}
              className="fa-solid fa-magnifying-glass"
              style={{
                color: "#88c242",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            ></i>
            <input
              className="nav-search"
              type="text"
              placeholder="Search here"
              onChange={handleKeyUp}
        value={term}
            />
             <ul>
             {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                
                to="/"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>

            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    
                    to="/login"
                    activeclassname="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    
                    to="/signup"
                    activeclassname="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    
                    to="/recipeform"
                    activeclassname="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    {user && user.username.toUpperCase()}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    
                    to="/user"
                    activeclassname="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Add Recipe
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    
                    activeclassname="active"
                    className="nav-links"
                    onClick={() => {
                      handleClick();
                      handleLogout();
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
