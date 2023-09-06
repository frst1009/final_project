/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUserData, selectIsAuth } from "../redux/slices/auth";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit, //funstion provided by the hook itself
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "morales@gmail.com",
      password: "hello",
    },
    mode:"onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values))
    // Dispatch the fetchUserData action to initiate the login process
if(!data.payload){
  return alert("Wrong email or password!");
}
    if('token' in data.payload){
  window.localStorage.setItem('token', data.payload.token)
}
}


if(isAuth){
  return <Navigate to='/'/>
}
  return (
    <section className="login-wrapper p-5">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-center">LOGIN</h2>
                <p className="text-center mb-4">Welcome Back!!</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-3">
                      Enter Your Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="enter email here ..."
                      {...register("email", { required: "Add email!" })}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
        <label htmlFor="password" className="form-label mb-3">
          Enter Your password
        </label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            placeholder="enter password here..."
            {...register("password", { required: "Add password!" })}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="m-0 text-center" >Forgot Password?</p>
                    <Link to="/forgotpassword" className="form-link">
                     Click here!
                    </Link>
                  </div>
                  <div className="d-grid gap-2">
                    <button disabled={!isValid} type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

