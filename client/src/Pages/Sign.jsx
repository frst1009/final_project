/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';
// import axios from "../axios";
// import { Avatar, Space, Upload } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

const Signup = () => {
  const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			username: 'Morales',
			email: 'morales@gmail.com',
			password: 'hello',
      confirmpassword:"hello",
      avatar:""
		},
		mode: 'onChange',
	});

  
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
if(!data.payload){
  return alert("Registration failed. Please check your data and try again.");
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
                  <h2 className="text-center">Sign Up</h2>
                  <p className="text-center mb-3">Join us in this adventure to heavenly taste!!</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
        <label htmlFor="image" className="form-label mb-3">
          Upload Your Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          id="image"
          {...register("avatar")}
        />
      </div>
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
                      <label htmlFor="email" className="form-label mb-3">
                        Enter Your Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="enter your name here ..."
                        {...register("username", { required: "Add your name!" })}
                    />
                    {errors.username && (
                      <p className="text-danger">{errors.username.message}</p>
                    )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label mb-3">
                        Enter Your password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="enter password here..."
                        {...register("password", { required: "Add password!" })}
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password.message}</p>
                    )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label mb-3"
                      >
                        Confirm Your password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmpassword"
                        placeholder="rewrite password here..."
                        {...register("confirmpassword", { required: "Add password!" })}
                        />
                        {errors.confirmpassword && (
                          <p className="text-danger">{errors.confirmpassword.message}</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p className='text-center'>
                        Have an account?
                      </p>
                      <Link to="/login" className="form-link">
                        Log In
                      </Link>
                    </div>
                    <div className="d-grid gap-2">
                      <button disabled={!isValid} type="submit">Sign Up</button>
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

export default Signup;