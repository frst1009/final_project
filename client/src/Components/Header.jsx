import React, { useState } from "react";
import { faBars, faTimes,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header className="navbar-middle sticky-top p-2 p-md-2 p-lg-2">
        <div className="container-xxl">
          <div className="row align-items-center m-0">
            <div className="col-md-2 d-flex justify-content-center">
              <button
                className="navbar-toggler d-md-none "
                type="button"
                onClick={toggleMenu}
              >
                <span className="navbar-toggler-icon">
                  {" "}
                  {showMenu ? (
                    <FontAwesomeIcon icon={faTimes} />
                  ) : (
                    <FontAwesomeIcon icon={faBars} />
                  )}
                </span>
              </button>

              <Link to="/"  className="logo" style={{color:"#FF6000", fontSize:"18px", fontWeight:"bolder"}}>Cooking Monsters</Link>

            </div>

            <div className="col-md-10 row col-lg-10">
              <div className="col-md-3 m-auto">
                <div className="input-group d-none d-md-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipe?..."
                    aria-label="Recipe?..."
                    aria-describedby="basic-addon2"
                  />
                  <button className="input-group-text" id="basic-addon2">
                  <FontAwesomeIcon style={{color:"rgba(255, 255, 255, 0.536)"}} icon={faSearch} />
                  </button>
                </div>
              </div>
              <div className="col-md-6 m-auto">
                <div className="menu-links mt-2 d-none d-md-flex d-lg-flex">
                  <div className="ms-auto gap-3">
                    <NavLink
                      to="/"
                      className={
                        location.pathname === "/" ? "active" : "not-active"
                      }
                      onClick={toggleMenu}
                    >
                      Home
                    </NavLink>
                  </div>

                  <div className="ms-auto gap-3">
                    <NavLink
                      to="/blog"
                      className={
                        location.pathname === "/blog" ? "active" : "not-active"
                      }
                      onClick={toggleMenu}
                    >
                      Login
                    </NavLink>
                  </div>
                  <div className="ms-auto gap-3">
                    <NavLink
                      to="/about"
                      className={
                        location.pathname === "/about" ? "active" : "not-active"
                      }
                      onClick={toggleMenu}
                    >
                      Register
                    </NavLink>
                  </div>
                  <div className="ms-auto gap-3">
                    <NavLink
                      to="/shop"
                      className={
                        location.pathname === "/shop" ? "active" : "not-active"
                      }
                      onClick={toggleMenu}
                    >
                      Add recipe
                    </NavLink>
                  </div>
                  <div className="ms-auto gap-3">
                    <NavLink
                      to="/contact"
                      className={
                        location.pathname === "/contact"
                          ? "active"
                          : "not-active"
                      }
                      onClick={toggleMenu}
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {showMenu && (
              <div className="col-md-10 d-md-none mt-3">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipe?..."
                    aria-label="Recipe?..."
                    aria-describedby="basic-addon2"
                  />
                  <button className="input-group-text" id="basic-addon2">
                  <FontAwesomeIcon icon={faSearch} style={{color:"rgba(255, 255, 255, 0.536)"}}/>
                  </button>
                </div>
                <div className="menu-links mt-2">
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/" ? "active" : "not-active"
                      }
                      to="/"
                      onClick={toggleMenu}
                    >
                      Home
                    </NavLink>
                  </div>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/shop" ? "active" : "not-active"
                      }
                      to="/shop"
                      onClick={toggleMenu}
                    >
                      Login
                    </NavLink>
                  </div>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/blog" ? "active" : "not-active"
                      }
                      to="/blog"
                      onClick={toggleMenu}
                    >
                      Register
                    </NavLink>
                  </div>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/about" ? "active" : "not-active"
                      }
                      to="/about"
                      onClick={toggleMenu}
                    >
                      Add recipe
                    </NavLink>
                  </div>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/contact"
                          ? "active"
                          : "not-active"
                      }
                      to="/contact"
                      onClick={toggleMenu}
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>

              
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
