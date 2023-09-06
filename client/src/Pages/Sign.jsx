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
  const [image, setImage] = useState("");
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
      confirmpassword:"hello"
		},
		mode: 'onChange',
	});
  // const handleChangeFile = async (event) => {
  //   try {
  //     const formData = new FormData();
  //     const file = event.fileList[0].originFileObj;
  //     formData.append("image", file);
  //     const { data } = await axios.post("/upload", formData);
  //     console.log(data);
  //    setImage(data.url);
  //   } catch (error) {
  //     console.error("Error in file upload:", error);
  //     alert("Error uploading image. Please try again.");
  //   }
  // };
  
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    // Dispatch the fetchUserData action to initiate the login process
if(!data.payload){
  return alert("Cant register!");
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
                  {/* <label htmlFor="profileImage" className="form-label mb-3">
  Choose Your Profile Image
</label>
<div className='mb-3' style={{display:"flex", justifyContent:"center"}}>
<Upload
                      name="image"
                      action="/upload"
                      accept="image/*"
                      showUploadList={false}
                      onChange={handleChangeFile}
                    >
                      <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                          <Avatar
                            size={64}
                            icon={<UserOutlined />}
                            src={image}
                            style={{ cursor: 'pointer' }}
                          />
                        </Space>
                      </Space>
                    </Upload>
</div> */}

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