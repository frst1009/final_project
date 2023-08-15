import React, { useState } from "react";
import { faBars, faTimes,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/auth";


const Header = () => {
  const isAuth=useSelector(selectIsAuth);
  const dispatch = useDispatch(selectIsAuth);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
const onClickLogout = () =>{
  if(window.confirm("Are you sure to leave?")){
    dispatch(logout());
    window.localStorage.removeItem('token')
    toggleMenu()
  }
}
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

              <Link to="/"  className="logo">Cooking Monsters</Link>

            </div>

            <div className="col-md-10 row col-lg-10">
              {/* <div className="col-md-3 m-auto">
                <div className="input-group d-none d-md-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipe?..."
                    aria-label="Recipe?..."
                    aria-describedby="basic-addon2"
                    style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}
                  />
                  <button className="input-group-text" id="basic-addon2">
                  <FontAwesomeIcon style={{color:"rgba(255, 255, 255, 0.536)"}} icon={faSearch} />
                  </button>
                </div>
              </div> */}
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

    {!isAuth ? (
      <>
        <div className="ms-auto gap-3">
          <NavLink
            to="/login"
            className={
              location.pathname === "/login" ? "active" : "not-active"
            }
            onClick={toggleMenu}
          >
            Login
          </NavLink>
        </div>
        <div className="ms-auto gap-3">
          <NavLink
            to="/signup"
            className={
              location.pathname === "/signup" ? "active" : "not-active"
            }
            onClick={toggleMenu}
          >
            Register
          </NavLink>
        </div>
      </>
    ) : (
      <>
        <div className="ms-auto gap-3">
          <NavLink
            to="/recipe"
            className={
              location.pathname === "/recipe" ? "active" : "not-active"
            }
            onClick={toggleMenu}
          >
            Add recipe
          </NavLink>
        </div>
        <div className="ms-auto gap-3">
          <NavLink
            to="/"
            className={
              location.pathname === "/" ? "active" : "not-active"
            }
            onClick={onClickLogout}
          >
            Logout
          </NavLink>
        </div>
      </>
    )}
  </div>
</div>
            </div>
            {showMenu && (//this part is for the mobile versions
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
                  {!isAuth ? (
      <>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/login" ? "active" : "not-active"
                      }
                      to="/login"
                      onClick={toggleMenu}
                    >
                      Login
                    </NavLink>
                  </div>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/signup" ? "active" : "not-active"
                      }
                      to="/signup"
                      onClick={toggleMenu}
                    >
                      Register
                    </NavLink>
                  </div></>):(<>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/recipe" ? "active" : "not-active"
                      }
                      to="/recipe"
                      onClick={toggleMenu}
                    >
                      Add recipe
                    </NavLink>
                  </div>
                  <div className="mb-2">
                    <NavLink
                      className={
                        location.pathname === "/"
                          ? "active"
                          : "not-active"
                      }
                      to="/"
                      onClick={onClickLogout}
                    >
                      Logout
                    </NavLink>
                  </div>
                  </>)}
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
